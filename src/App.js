import "./App.css";
import React from "react";
import DragAndDrop from "./compenents/DragAndDrop.js";
import NodeContextMenu from './compenents/NodeContextMenu'

function App() {
  return (
    <div className="App">
      <div className="nodeContextMenu">
        {/* <DragAndDrop /> */}
        <NodeContextMenu/>

      </div>
      <div className="dragAndDrop">
        <DragAndDrop/>
        {/* <NodeContextMenu/> */}
      </div>
      <div className="">
        {/* <DragAndDrop /> */}
        {/* <p>Dagre Tree</p> */}
      </div>
    </div>
  );
}

export default App;
