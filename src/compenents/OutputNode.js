import { Handle, Position } from "reactflow";
function DefaultNode() {
  return (
    <div  className="outputNode">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <div className="nodeText">Output Node</div>
    </div>
  );
}

export default DefaultNode;
