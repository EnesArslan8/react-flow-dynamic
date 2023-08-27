import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./DragAndDropMenu";
import CustomNode from "./CustomNode";
import DefaultNode from "./DefaultNode";
import InputNode from "./InputNode";
import OutputNode from './OutputNode';
import TargetCustomNode from "./TargetCustomNode";


const nodeTypes={
  input:InputNode,
  default:DefaultNode,
  output:OutputNode,
  custom:CustomNode,
  targetCustom:TargetCustomNode
}


const initialNodes = [

];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event?.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event?.dataTransfer?.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const edgeOptions = {
    animated: true,
    type:'smoothstep',
    style: {
      stroke: "#888",
    },
    markerEnd: {
      fontSize: "20px",
      // color:'000',
      type: MarkerType.ArrowClosed
    },
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}
            defaultEdgeOptions={edgeOptions}
          >
            <Controls />
            <Panel style={{width:'100%',textAlign:'center',marginLeft:'auto',marginTop:'auto'}} position="top-center"><p className="dragTitle">Drag And Drop</p></Panel>
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
