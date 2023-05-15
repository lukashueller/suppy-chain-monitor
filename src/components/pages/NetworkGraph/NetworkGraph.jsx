/* eslint-disable max-len */

import React, { useEffect, useState } from "react";
import Graphin from "@antv/graphin";
import { v4 as uuidv4 } from "uuid";
import { getDataForCompany, getLabelForCompany, getNetworkForCompany } from "../../../utils/api";
import { graphine_graph_layout, nodeOnToggleCollapse, lbbwNodeConfig } from "./NetworkGraphHelper";

function NetworkGraph(props) {
  const { rootNodeValue, handleNodeClick } = props;
  const [graphData, setGraphData] = useState(null);

  const handleFetch = async () => {
    if (rootNodeValue === null) return;
    const fetchedNetwork = await getNetworkForCompany(rootNodeValue);
    const { network } = fetchedNetwork;
    setGraphData(await generateNetworkHierarchy(network));
  };

  const generateNetworkHierarchy = async (network, depth = 0) => {
    const uuid = uuidv4().toString();
    const company_data = await getDataForCompany(network.value);

    const children = await Promise.all(
      (network.tier1 ?? []).map(async (supplier) => generateNetworkHierarchy(supplier, depth + 1))
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
  }, [rootNodeValue]);

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

  if (rootNodeValue === null) return null;
  if (graphData === null) {
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
}

export default NetworkGraph;
