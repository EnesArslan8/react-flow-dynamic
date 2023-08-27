import "./App.css";
import React from "react";
import DragAndDrop from "./compenents/DragAndDrop.js";
import NodeContextMenu from "./compenents/NodeContextMenu";
import DagreTree from "./compenents/DagreTree";

function App() {
  return (
    <div className="App">
      <div className="nodeContextMenu">
        <NodeContextMenu />
      </div>
      <div className="dragAndDrop">
        <DragAndDrop />
      </div>
      <div className="dagreTree">
        <DagreTree />
        {/* <p>Dagre Tree</p> */}
      </div>
    </div>
  );
}

export default App;
