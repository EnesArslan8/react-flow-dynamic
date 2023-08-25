import { Handle, Position } from "reactflow";
function DefaultNode() {
  return (
    <div className="defaultNode">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />
      <div className="nodeText">Default Node</div>
    </div>
  );
}

export default DefaultNode;
