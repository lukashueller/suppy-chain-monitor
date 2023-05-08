/* eslint-disable max-len */

import React, { useEffect, useState } from "react";
import Graphin, { Behaviors } from "@antv/graphin";
import { v4 as uuidv4 } from "uuid";
import { getLabelForCompany, getNetworkForCompany } from "../../../utils/api";
import { graphine_layout, nodeBasicMethod, cardNode } from "./NetworkGraphHelper";

const { TreeCollapse } = Behaviors;

function NetworkGraph(props) {
  const { rootNodeValue } = props;
  const [graphData, setGraphData] = useState({ id: "0", name: "Loading...", children: [] });

  const handleFetch = async () => {
    const fetchedNetwork = await getNetworkForCompany(rootNodeValue);
    const { network } = fetchedNetwork;

    setGraphData(generateNetworkHierarchy(network));
  };

  const generateNetworkHierarchy = (network, depth = 0) => {
    const uuid = uuidv4().toString();
    if ("tier1" in network) {
      return {
        id: uuid,
        collapsed: depth > 2,
        name: getLabelForCompany(network.value),
        company_no: `HRB391${uuid.substring(0, 4)}`,
        nodeWarning: getLabelForCompany(network.value).startsWith("l"),
        dataType: depth === 0 ? "root" : "node", // root node is the first node
        keyInfo: "this is a card node info",
        children: network.tier1.map((supplier) => generateNetworkHierarchy(supplier, depth + 1)),
      };
    }
    return {
      id: uuid,
      collapsed: false,
      name: getLabelForCompany(network.value),
      company_no: `HRB391${uuid.substring(0, 4)}`,
      nodeWarning: getLabelForCompany(network.value).startsWith("l"),
      dataType: depth === 0 ? "root" : "node", // root node is the first node
      keyInfo: "this is a card node info",
      children: [],
    };
  };

  useEffect(() => {
    handleFetch();
  }, [rootNodeValue]);

  Graphin.registerNode("card-node", cardNode);

  Graphin.registerBehavior("behaviorName", {
    getEvents() {
      return {
        "node:click": "onNodeClick",
      };
    },
    onNodeClick(evt) {
      console.log("Node clicked"); // , evt);
    },
  });

  return (
    <Graphin
      data={graphData}
      layout={graphine_layout}
      animate
      modes={{
        default: [
          "behaviorName",
          "drag-canvas",
          "zoom-canvas",
          {
            type: "collapse-expand",
            onchange: nodeBasicMethod.onToggleCollapse,
          },
        ],
      }}
      fitView
      defaultNode={{ type: "card-node" }}
      defaultEdge={{ type: "cubic-horizontal" }}
    />
  );
}

export default NetworkGraph;
