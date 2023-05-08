/* eslint-disable max-len */

import React, { useEffect, useState } from "react";
import { getLabelForCompany, getNetworkForCompany } from "../../../utils/api";
import Graphin, { Behaviors } from "@antv/graphin";

const { TreeCollapse } = Behaviors;

const NetworkGraph = (props) => {
  const { rootNodeValue } = props;
  const [graphData, setGraphData] = useState({ id: "0", name: "Loading...", children: [] });
  const graphRef = React.createRef();

  const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
    return [
      ["M", x - r, y],
      ["a", r, r, 0, 1, 0, r * 2, 0],
      ["a", r, r, 0, 1, 0, -r * 2, 0],
      ["M", x - r + 4, y],
      ["L", x - r + 2 * r - 4, y],
    ];
  };
  const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
    return [
      ["M", x - r, y],
      ["a", r, r, 0, 1, 0, r * 2, 0],
      ["a", r, r, 0, 1, 0, -r * 2, 0],
      ["M", x - r + 4, y],
      ["L", x - r + 2 * r - 4, y],
      ["M", x - r + r, y - r + 4],
      ["L", x, y + r - 4],
    ];
  };
  const handleFetch = async () => {
    const fetchedNetwork = await getNetworkForCompany(rootNodeValue);
    const network = fetchedNetwork.network;

    setGraphData(recursiveStuff(network));
  };

  let i = 0;
  const recursiveStuff = (network, depth = 0) => {
    if ("tier1" in network) {
      return {
        id: String(i++),
        collapsed: depth > 2,
        name: getLabelForCompany(network.value),
        company_no: "HRB391" + String(i),
        nodeWarning: getLabelForCompany(network.value).startsWith("l"),
        dataType: i == 1 ? "root" : "node", // root node is the first node
        keyInfo: "this is a card node info",
        children: network.tier1.map((supplier) => recursiveStuff(supplier, depth + 1)),
      };
    }
    return {
      id: String(i++),
      collapsed: false,
      name: getLabelForCompany(network.value),
      company_no: "HRB391" + String(i),
      nodeWarning: getLabelForCompany(network.value).startsWith("l"),
      dataType: i == 1 ? "root" : "node", // root node is the first node
      keyInfo: "this is a card node info",
      children: [],
    };
  };

  useEffect(() => {
    handleFetch();
  }, [rootNodeValue]);

  const getNodeConfig = (node) => {
    let config = {
      basicColor: "#5B8FF9",
      fontColor: "#5B8FF9",
      borderColor: "#5B8FF9",
      bgColor: "#C6E5FF",
    };

    if (node.nodeWarning) {
      config = {
        basicColor: "#F5222D",
        fontColor: "#FFF",
        borderColor: "#F5222D",
        bgColor: "#E66A6C",
      };
    }

    return config;
  };

  const setNodeWithId = (node, id, collapsed) => {
    if (node.id === id) {
      node.collapsed = collapsed;
      return node;
    }
    if (node.children) {
      node.children = node.children.map((child) => setNodeWithId(child, id));
    }
    return node;
  };

  const nodeBasicMethod = {
    createNodeBox: (group, config, w, h, isRoot) => {
      //background rect
      const container = group.addShape("rect", {
        attrs: {
          x: 0,
          y: 0,
          width: w,
          height: h,
        },
        name: "big-rect-shape",
      });
      //anchor circle for all non-root nodes
      if (!isRoot) {
        group.addShape("circle", {
          attrs: {
            x: 3,
            y: h / 2,
            r: 6,
            fill: config.basicColor,
          },
          name: "left-dot-shape",
        });
      }
      //main, lighter, rect
      group.addShape("rect", {
        attrs: {
          x: 3,
          y: 0,
          width: w - 19,
          height: h,
          fill: config.bgColor,
          stroke: config.borderColor,
          radius: 2,
          cursor: "pointer",
        },
        name: "rect-shape",
      });
      //thicker border on left side
      group.addShape("rect", {
        attrs: {
          x: 3,
          y: 0,
          width: 3,
          height: h,
          fill: config.basicColor,
          radius: 1.5,
        },
        name: "left-border-shape",
      });
      return container;
    },
    createNodeMarker: (group, collapsed, x, y) => {
      group.addShape("circle", {
        attrs: {
          x,
          y,
          r: 13,
          fill: "rgba(47, 84, 235, 0.05)",
          opacity: 0,
          zIndex: -2,
        },
        name: "collapse-icon-bg",
      });
      group.addShape("marker", {
        attrs: {
          x,
          y,
          r: 7,
          symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
          stroke: "rgba(0,0,0,0.25)",
          fill: "rgba(0,0,0,0)",
          lineWidth: 1,
          cursor: "pointer",
        },
        name: "collapse-icon",
      });
    },
    afterDraw: (cfg, group) => {
      const icon = group.find((element) => element.get("name") === "collapse-icon");
      if (icon) {
        const bg = group.find((element) => element.get("name") === "collapse-icon-bg");
        icon.on("mouseenter", () => {
          bg.attr("opacity", 1);
        });
        icon.on("mouseleave", () => {
          bg.attr("opacity", 0);
        });
        icon.on("click", () => {
          // console.log(graphRef.current);
          // if (graphRef.current) {
          //   graphRef.current.shouldUpdate();
          // }
          // console.log("click");
          // setGraphData(toggleNodeWithId(graphData, cfg.id));
        });
      }

      // const company_noBox = group.find((element) => element.get("name") === "company_no-box");
      // if (company_noBox) {
      //   const company_noLine = group.find((element) => element.get("name") === "company_no-cp-line");
      //   const company_noBG = group.find((element) => element.get("name") === "company_no-cp-bg");
      //   const company_noIcon = group.find((element) => element.get("name") === "company_no-cp-icon");
      //   const company_noCPBox = group.find((element) => element.get("name") === "company_no-cp-box");

      //   const onMouseEnter = () => {
      //     company_noLine.attr("opacity", 1);
      //     company_noBG.attr("opacity", 1);
      //     company_noIcon.attr("opacity", 1);
      //     // graph.get("canvas").draw();
      //   };
      //   const onMouseLeave = () => {
      //     company_noLine.attr("opacity", 0);
      //     company_noBG.attr("opacity", 0);
      //     company_noIcon.attr("opacity", 0);
      //     // graph.get("canvas").draw();
      //   };
      //   company_noBox.on("mouseenter", () => {
      //     onMouseEnter();
      //   });
      //   company_noBox.on("mouseleave", () => {
      //     onMouseLeave();
      //   });
      //   company_noCPBox.on("mouseenter", () => {
      //     onMouseEnter();
      //   });
      //   company_noCPBox.on("mouseleave", () => {
      //     onMouseLeave();
      //   });
      //   company_noCPBox.on("click", () => {});
      // }
    },
    setState: (name, value, item) => {
      const hasOpacityClass = [
        "company_no-cp-line",
        "company_no-cp-bg",
        "company_no-cp-icon",
        "company_no-cp-box",
        "company_no-box",
        "collapse-icon-bg",
      ];
      const group = item.getContainer();
      const childrens = group.get("children");
      if (name === "emptiness") {
        if (value) {
          childrens.forEach((shape) => {
            if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
              return;
            }
            shape.attr("opacity", 0.4);
          });
        } else {
          childrens.forEach((shape) => {
            if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
              return;
            }
            shape.attr("opacity", 1);
          });
        }
      }
    },
  };

  Graphin.registerNode("card-node", {
    getAnchorPoints(cfg) {
      return [
        [0, 0.5],
        [1, 0.5],
      ];
    },
    draw: (cfg, group) => {
      const config = getNodeConfig(cfg);
      const isRoot = cfg.dataType === "root";
      const nodeWarning = cfg.nodeWarning;
      /* the biggest rect */
      const container = nodeBasicMethod.createNodeBox(group, config, 243, 64, isRoot);

      if (cfg.dataType !== "root") {
        /* the type text */
        group.addShape("text", {
          attrs: {
            text: cfg.dataType,
            x: 3,
            y: -10,
            fontSize: 12,
            textAlign: "left",
            textBaseline: "middle",
            fill: "rgba(0,0,0,0.65)",
          },
          name: "type-text-shape",
        });
      }

      if (cfg.company_no) {
        /* company_no start */
        /* company_noBox */
        const company_noRect = group.addShape("rect", {
          attrs: {
            fill: nodeWarning ? null : "#FFF",
            stroke: nodeWarning ? "rgba(255,255,255,0.65)" : null,
            radius: 2,
            cursor: "pointer",
          },
          name: "company_no-container-shape",
        });

        /* company_no */
        const company_noText = group.addShape("text", {
          attrs: {
            text: cfg.company_no,
            x: 0,
            y: 19,
            fontSize: 12,
            textAlign: "left",
            textBaseline: "middle",
            fill: nodeWarning ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.65)",
            cursor: "pointer",
          },
          name: "company_no-text-shape",
        });

        const company_noBBox = company_noText.getBBox();
        /* the distance from the company_no to the right is 12px */
        company_noText.attr({
          x: 224 - 12 - company_noBBox.width,
        });
        /* company_noBox */
        company_noRect.attr({
          x: 224 - 12 - company_noBBox.width - 4,
          y: company_noBBox.minY - 5,
          width: company_noBBox.width + 8,
          height: company_noBBox.height + 10,
        });

        /* a transparent shape on the company_no for click listener */
        group.addShape("rect", {
          attrs: {
            stroke: "",
            cursor: "pointer",
            x: 224 - 12 - company_noBBox.width - 4,
            y: company_noBBox.minY - 5,
            width: company_noBBox.width + 8,
            height: company_noBBox.height + 10,
            fill: "#fff",
            opacity: 0,
          },
          name: "company_no-box",
        });

        /* copycompany_noLine */
        group.addShape("rect", {
          attrs: {
            x: 194,
            y: 7,
            width: 1,
            height: 24,
            fill: "#E3E6E8",
            opacity: 0,
          },
          name: "company_no-cp-line",
        });
        /* copycompany_noBG */
        group.addShape("rect", {
          attrs: {
            x: 195,
            y: 8,
            width: 22,
            height: 22,
            fill: "#FFF",
            cursor: "pointer",
            opacity: 0,
          },
          name: "company_no-cp-bg",
        });
        /* copycompany_noIcon */
        group.addShape("image", {
          attrs: {
            x: 200,
            y: 13,
            height: 12,
            width: 10,
            img: "https://os.alipayobjects.com/rmsportal/DFhnQEhHyPjSGYW.png",
            cursor: "pointer",
            opacity: 0,
          },
          name: "company_no-cp-icon",
        });
        /* a transparent rect on the icon area for click listener */
        group.addShape("rect", {
          attrs: {
            x: 195,
            y: 8,
            width: 22,
            height: 22,
            fill: "#FFF",
            cursor: "pointer",
            opacity: 0,
          },
          name: "company_no-cp-box",
          tooltip: "Copy the company_no",
        });

        /* company_no end */
      }

      /* name */
      group.addShape("text", {
        attrs: {
          text: cfg.name,
          x: 19,
          y: 19,
          fontSize: 14,
          fontWeight: 700,
          textAlign: "left",
          textBaseline: "middle",
          fill: config.fontColor,
          cursor: "pointer",
        },
        name: "name-text-shape",
      });

      /* the description text */
      group.addShape("text", {
        attrs: {
          text: cfg.keyInfo,
          x: 19,
          y: 45,
          fontSize: 14,
          textAlign: "left",
          textBaseline: "middle",
          fill: config.fontColor,
          cursor: "pointer",
        },
        name: "bottom-text-shape",
      });

      if (nodeWarning) {
        group.addShape("text", {
          attrs: {
            x: 191,
            y: 62,
            text: "⚠️",
            fill: "#000",
            fontSize: 18,
          },
          name: "error-text-shape",
        });
      }

      const hasChildren = cfg.children && cfg.children.length > 0;
      if (hasChildren) {
        nodeBasicMethod.createNodeMarker(group, cfg.collapsed, 236, 32);
      }

      return container;
    },
    afterDraw: nodeBasicMethod.afterDraw,
    setState: nodeBasicMethod.setState,
  });

  Graphin.registerBehavior("behaviorName", {
    getEvents() {
      return {
        "node:click": "onNodeClick",
        // "edge:click": "onEdgeClick",
        // mousemove: "onMouseMove",
      };
    },
    onNodeClick(evt) {
      // TODO
      console.log("Node clicked"); //, evt);
    },
    // onEdgeClick(evt) {
    //   // TODO
    //   console.log("onEdgeClick", evt);
    // },
    // onMouseMove(evt) {
    //   // TODO
    //   console.log("onMouseMove", evt);
    // },
  });

  const graphine_layout = {
    type: "compactBox",
    direction: "LR",
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 64;
    },
    getWidth: function getWidth() {
      return 243;
    },
    getVGap: function getVGap() {
      return 26;
    },
    getHGap: function getHGap() {
      return 26;
    },
    title: "紧凑树布局",
  };

  return (
    <Graphin
      ref={graphRef}
      data={graphData}
      layout={graphine_layout}
      modes={{
        default: [
          "behaviorName",
          {
            type: "collapse-expand",
            onChange(item, collapsed) {
              const { graph, apis } = graphRef.current;
              console.log(graph, apis);
              const icon = item.get("group").findAllByName("collapse-icon")[0];
              if (collapsed) {
                icon.attr("symbol", EXPAND_ICON);
              } else {
                icon.attr("symbol", COLLAPSE_ICON);
              }
            },
          },
          "drag-canvas",
          "zoom-canvas",
        ],
      }}
      fitView
      defaultNode={{ type: "card-node" }}
      defaultEdge={{ type: "cubic-horizontal" }}
    />
  );
};

export default NetworkGraph;
