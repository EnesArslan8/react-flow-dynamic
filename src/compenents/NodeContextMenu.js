import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  Panel,
  useEdgesState,
  addEdge,
} from "reactflow";
import ContextMenu from "./ContextMenu";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 175, y: 0 }, data: { label: "a" } },
  { id: "2", position: { x: 0, y: 250 }, data: { label: "b" } },
  { id: "3", position: { x: 175, y: 250 }, data: { label: "c" } },
  { id: "4", position: { x: 350, y: 250 }, data: { label: "d" } },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
  },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      console.log(pane)
      console.log(event.clientX)
      console.log(event.clientY)
      setMenu({
        id: node.id,
        // top: event.clientY <= pane.height - 200 && event.clientY,
        // left: event.clientX < pane.width - 200 && event.clientX,
        // right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        // bottom:
        //   event.clientY >= pane.height - 200 && pane.height - event.clientY,
        top: event.clientX <= pane.height -200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div className="contextMenu">
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
      >
        <Panel position="top-center">
          <p className="dragTitle">Node Context Menu</p>
        </Panel>
        {/* <Background /> */}
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlow>
    </div>
  );
};

export default Flow;