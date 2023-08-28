import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  Panel,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import ContextMenu from "./ContextMenu";

import "reactflow/dist/style.css";

const customStyle = {
  width: 200,
  height: 50,
  backgroundColor: 'blue',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  fontSize:14,
  color:'#fff',
  fontWeight:600
};
const customStyle2 = {
    width: 200,
    height: 50,
    backgroundColor: '#000',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:14,
    color:'#fff',
    fontWeight:600
  };
const initialNodes = [
  {
    id: "1",
    position: { x: 175, y: 0 },
    data: { label: "Nasılsın ?" },
    style: customStyle,
  },
  { id: "2", position: { x: 0, y: 250 }, data: { label: "İyiyim" } ,style:customStyle2},
  { id: "3", position: { x: 70, y: 350 }, data: { label: "İdare eder" },style:customStyle2 },
  { id: "4", position: { x: 140, y: 450 }, data: { label: "Hiç sorma..." } ,style:customStyle2},
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

const edgeOptions = {
  animated: true,
  type: "simplebezier",
  style: {
    stroke: "#cc9972",
  },
  markerEnd: {
    fontSize: "20px",
    // color:'000',
    type: MarkerType.ArrowClosed,
  },
};

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
      setMenu({
        id: node.id,
        top: event.clientY <= pane.height - 200 && event.clientY,
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
        defaultEdgeOptions={edgeOptions}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        // nodeTypes={nodeTypes}
      >
        <Panel position="top-center" style={{width:'100%',textAlign:'center',marginLeft:'auto',marginTop:'auto'}}>
          <p className="dragTitle" style={{borderBottom:'1px solid #acacac'}}>Node Context Menu</p>
        </Panel>
        {/* <Background /> */}
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        <Panel style={{background:'pink',width:'100%',marginLeft:'auto',marginBottom:'auto'}} position="bottom-center">
          <p style={{color:'brown',fontWeight:900,background:'rgba(255,255,255,.6)',textAlign:'center'}}>You can add node or delete node</p>
        </Panel>
      </ReactFlow>
      
    </div>
  );
};

export default Flow;
