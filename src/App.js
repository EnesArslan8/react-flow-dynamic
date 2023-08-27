import "./App.css";
import React from "react";
import DragAndDrop from "./compenents/DragAndDrop.js";
import NodeContextMenu from "./compenents/NodeContextMenu";
function App() {
  return (
    <div className="App">
      <div className="nodeContextMenu">
        <NodeContextMenu />
      </div>
      <div className="dragAndDrop">
        <DragAndDrop />
      </div>
      <div className="validation">
        
      </div>
    </div>
  );
}

export default App;
