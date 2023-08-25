import { Handle, Position } from "reactflow";
function TargetCustomNode() {
  return (
    <div className="customNodeContainer target">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        id="a"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "#555" }}
        id="b"
      />
      <Handle
        type="target"
        position={Position.Right}
        style={{ background: "#555" }}
        id="c"
      />
      <div className="customNodeContent target" >
      <div className="rotateContent target">Custom Target Node</div>
      </div>
    </div>
  );
}

export default TargetCustomNode;
