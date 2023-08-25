import { Handle, Position } from "reactflow";
function CustomNode() {
  return (
    <div className="customNodeContainer">
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: "#555" }}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
        id="b"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        id="c"
      />
      <div className="customNodeContent">
        <div className="rotateContent">Custom Source Node</div>
      </div>
    </div>
  );
}

export default CustomNode;
