import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar";
import { getLabelForCompany, getNetworkForCompany } from "../../../utils/api";

const NetworkGraph = (props) => {
  const { rootNodeValue } = props;
  const [graphData, setGraphData] = useState({ name: rootNodeValue });
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });
  const [treeContainerRef, setTreeContainerRef] = useState(null);
  let network = {};

  const recursiveStuff = (network) => {
    if ("tier1" in network) {
      return {
        name: getLabelForCompany(network.value),
        children: network.tier1.map((supplier) => recursiveStuff(supplier)),
      };
    }
    return { name: getLabelForCompany(network.value) };
  };

  const handleFetch = async () => {
    //console.log("FETCHING IN PROGRESS");
    const fetchedNetwork = await getNetworkForCompany(rootNodeValue);
    network = fetchedNetwork.network;
    //console.log("FETCHING FINISHED");

    setGraphData(recursiveStuff(network));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (treeContainerRef != null) {
      const dimensions = treeContainerRef.getBoundingClientRect();
      setDimensions({
        x: dimensions.width / 10,
        y: dimensions.width / 4,
      });
    }
  }, [treeContainerRef]);

  return (
    <div
      /* style={{
        width: "100%",
        height: "100vh",
      }} */
      style={{
        width: "100vw",
        height: "60vh",
      }}
      ref={(tc) => setTreeContainerRef(tc)}
    >
      <Tree
        data={graphData}
        translate={dimensions}
        orientation={"horizontal"}
        nodeSvgShape={{
          shape: "rect",
          shapeProps: {
            width: 40,
            height: 20,
            x: -10,
            y: -10,
          },
        }}
        circleRadius={30}
      />
    </div>
  );
};

export default NetworkGraph;
