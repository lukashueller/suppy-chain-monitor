/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import Graphin from "@antv/graphin";
import { v4 as uuidv4 } from "uuid";
import { getDataForCompany, getLabelForCompany, getNetworkForCompany } from "../../../utils/api";
import { graphine_graph_layout, nodeOnToggleCollapse, lbbwNodeConfig } from "./NetworkGraphHelper";

const NetworkGraph = (props) => {
  const { handleNodeClick, tierOneSuppliers, usedInDrawer } = props;
  const [graphData, setGraphData] = useState(null);

  const generateNetworkHierarchy = async (networkArrayForTierOneSuppliers, depth = 0) => {
    const children = await Promise.all(
      networkArrayForTierOneSuppliers.map(
        async (supplier) => await generateNetworkHierarchyForSingleSupplier(supplier.network)
      )
    );

    // CHANGE STUFF FOR ROOT NODE HERE
    return {
      id: uuidv4().toString(),
      collapsed: depth > 2,
      name: "MY COMPANY", // getLabelForCompany(network.value)*/,
      /* company_no: `HRB${uuid.substring(0, 4)}`,
      esgWarningLevel: company_data?.estimated_risk,
      dataType: depth === 0 ? "root" : "node",
      keyInfo: company_data?.contact, */
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
      setGraphData(await generateNetworkHierarchy(networkArrayForTierOneSuppliers));
    }
  };

  const generateNetworkHierarchyForSingleSupplier = async (network, depth = 1) => {
    const uuid = uuidv4().toString();
    const company_data = await getDataForCompany(network.value);

    const children = await Promise.all(
      (network.tier1 ?? []).map(async (supplier) =>
        generateNetworkHierarchyForSingleSupplier(supplier, depth + 1)
      )
    );

    return {
      id: uuid,
      collapsed: depth > 2,
      name: getLabelForCompany(network.value),
      company_no: `HRB391${uuid.substring(0, 4)}`,
      esgWarningLevel: company_data?.estimated_risk,
      dataType: depth === 0 ? "root" : "node",
      keyInfo: company_data?.contact,
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
      /* console.log(evt);
      console.log(evt.target); */
      handleNodeClick(evt);
    },
  });

  if (graphData === null || graphData.children.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <Graphin
      data={graphData}
      layout={graphine_graph_layout}
      animate
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
      defaultEdge={{ type: "cubic-horizontal" }}
    />
  );
};

export default NetworkGraph;
