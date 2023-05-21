/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import Graphin from "@antv/graphin";
import { v4 as uuidv4 } from "uuid";
import { getDataForCompany, getLabelForCompany, getNetworkForCompany } from "../../../utils/api";
import { graphine_graph_layout, nodeOnToggleCollapse, lbbwNodeConfig } from "./NetworkGraphHelper";

const NetworkGraph = (props) => {
  const { handleNodeClick, tierOneSuppliers, usedInDrawer, loading, setLoading } = props;
  const [graphData, setGraphData] = useState(null);

  const generateNetworkHierarchy = async (networkArrayForTierOneSuppliers) => {
    const children = await Promise.all(
      networkArrayForTierOneSuppliers.map(
        async (supplier) => await generateNetworkHierarchyForSingleSupplier(supplier.network)
      )
    );

    // CHANGE STUFF FOR ROOT NODE HERE
    const uuid = uuidv4().toString();
    return {
      id: uuid,
      dataType: "root",
      collapsed: false,
      name: "YOUR COMPANY",
      company_no: `HRB${uuid.substring(0, 4)}`,
      //esgWarningLevel: company_data?.estimated_risk,
      //keyInfo: company_data?.contact, */
      children: children,
    };
  };

  const handleFetch = async () => {
    const networkArrayForTierOneSuppliers = await Promise.all(
      tierOneSuppliers.map(async (supplier) => {
        return await getNetworkForCompany(supplier);
      })
    );

    if (usedInDrawer) {
      const { network } = await getNetworkForCompany(tierOneSuppliers[0]);
      setGraphData(await generateNetworkHierarchyForSingleSupplier(network));
    } else {
      setLoading(false);
      setGraphData(await generateNetworkHierarchy(networkArrayForTierOneSuppliers));
    }
  };

  const generateNetworkHierarchyForSingleSupplier = async (network, depth = 1) => {
    const company_data = await getDataForCompany(network.value);

    const risk_label =
      company_data?.estimated_risk +
      (company_data?.estimated_risk === "unestimated" ? "" : " risk");
    const children = await Promise.all(
      (network.tier1 ?? []).map(async (supplier) =>
        generateNetworkHierarchyForSingleSupplier(supplier, depth + 1)
      )
    );

    return {
      id: uuidv4().toString(),
      collapsed: depth > 2,
      name: getLabelForCompany(network.value),
      risk_label: risk_label,
      esgWarningLevel: company_data?.estimated_risk,
      dataType: depth === 0 ? "root" : "node",
      keyInfo: "Source: " + company_data?.confirmation,
      children: children,
    };
  };

  useEffect(() => {
    handleFetch();
  }, [tierOneSuppliers]);

  Graphin.registerNode("lbbw-node", lbbwNodeConfig);

  Graphin.registerBehavior("custom-node-click-behavior", {
    getEvents() {
      return {
        "node:click": "onNodeClick",
      };
    },
    onNodeClick(evt) {
      if (evt.target.constructor.name === "Marker") return;

      handleNodeClick(evt);
    },
  });

  if (graphData === null || graphData.children.length === 0 || loading) {
    return <h1 style={{ height: "74vh" }}>Loading...</h1>; // we love magic numbers :D
  }
  return (
    <Graphin
      data={graphData}
      layout={graphine_graph_layout}
      animate
      style={{ borderRadius: "5px", backgroundColor: "#E0E0E0", height: "80vh" }}
      modes={{
        default: [
          "custom-node-click-behavior",
          "drag-canvas",
          "zoom-canvas",
          {
            type: "collapse-expand",
            onchange: nodeOnToggleCollapse,
          },
        ],
      }}
      fitView
      defaultNode={{ type: "lbbw-node" }}
      defaultEdge={{
        type: "cubic-horizontal",
        style: {
          stroke: "grey" /* "#E20074" */,
          lineWidth: 2,
        },
      }}
    />
  );
};

export default NetworkGraph;
