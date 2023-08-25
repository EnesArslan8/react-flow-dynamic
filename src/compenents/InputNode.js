import { Handle, Position } from "reactflow";
function InputNode() {
  return (
    <div className="inputNode">
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div className="nodeText">
        Input Node
      </div>
    </div>
  );
}

export default InputNode;
