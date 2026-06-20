// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap, SimpleBezierEdge } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { NoteNode } from "./nodes/noteNode";
import { FilterNode } from "./nodes/filterNode";
import { LogicNode } from "./nodes/logicNode";
import { TransformNode } from "./nodes/transformNode";
import { ActionNode } from "./nodes/actionNode";

import "reactflow/dist/style.css";

const gridSize = 25;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  note: NoteNode,
  filter: FilterNode,
  logic: LogicNode,
  transform: TransformNode,
  action: ActionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={reactFlowWrapper} className="w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges} 
          edgeTypes={{ simplebezier: SimpleBezierEdge }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="simplebezier"
          defaultEdgeType="simplebezier"
          edge
          panOnScroll={false}
          zoomOnScroll={true}
          panOnDrag={true}
          selectionOnDrag={false}
          zoomOnPinch={true}
          zoomOnDoubleClick={true}
          preventScrolling={true}
          minZoom={0.1}
          maxZoom={2}
        >
          <Background gap={gridSize} />
          <Controls
            className="!bg-card !border-border !shadow-lg !rounded-xl overflow-hidden"
            position="top-left"
          />
          <MiniMap
            className="!bg-card !border-border !shadow-lg !rounded-xl [&_svg]:rounded-lg hidden md:block"
            position="top-right"
          />
        </ReactFlow>
      </div>
    </div>
  );
};
