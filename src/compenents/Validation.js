import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Handle, Position ,Panel} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 } },
  { id: 'Ankara', type: 'customnode', position: { x: 400, y: 0 } },
  { id: 'Bursa', type: 'customnode', position: { x: 400, y: 150 } },
  { id: 'İstanbul', type: 'customnode', position: { x: 400, y: 300 } },
];

const isValidConnection = (connection) => connection.target === 'Ankara';
const onConnectStart = (_, { nodeId, handleType }) =>
  console.log('on connect start', { nodeId, handleType });
const onConnectEnd = (event) => console.log('on connect end', event);

const CustomInput = () => (
  <div style={{padding:'1rem 3rem',background:'linear-gradient(to left, #BA8B02 ,#181818)'}} >
    <div style={{color:'#fff'}}>Türkiye'nin başkenti neresidir ?</div>
    <Handle type="source" position={Position.Right} />
  </div>
);

const CustomNode = ({ id }) => (
  <div style={{padding:'1rem 3rem',background:'linear-gradient(to left, #0f0c29 ,#302b63, #24243e)'}}>
    <Handle type="target" position={Position.Left} />
    <div style={{color:'#fff'}}>{id}</div>
    <Handle type="source" position={Position.Right} />
  </div>
);

const nodeTypes = {
  custominput: CustomInput,
  customnode: CustomNode,
};

const ValidationFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      isValidConnection={isValidConnection}
      selectNodesOnDrag={false}
      className="validationflow"
      nodeTypes={nodeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      fitView
      attributionPosition="bottom-left"
    >
      <Panel style={{width:'100%',textAlign:'center',marginLeft:'auto',marginTop:'auto'}} position="top-center"><p className="dragTitle">Validation</p></Panel>
    </ReactFlow>
  );
};

export default ValidationFlow;
