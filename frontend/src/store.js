// store.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      nodeIDs: {},
      getNodeID: (type) => {
          const newIDs = {...get().nodeIDs};
          if (newIDs[type] === undefined) {
              newIDs[type] = 0;
          }
          newIDs[type] += 1;
          set({nodeIDs: newIDs});
          return `${type}-${newIDs[type]}`;
      },
      addNode: (node) => {
          set({
              nodes: [...get().nodes, node]
          });
      },
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection) => {
        if (connection.source === connection.target) return;
        
        set({
          edges: addEdge({
            ...connection, 
            type: 'simplebezier', 
            animated: true, 
            markerEnd: {
              type: MarkerType.Arrow, 
              height: '20px', 
              width: '20px'
            }
          }, get().edges),
        });
      },
      updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, [fieldName]: fieldValue };
            }
    
            return node;
          }),
        });
      },
      deleteNode: (nodeId) => {
        set({
          nodes: get().nodes.filter((node) => node.id !== nodeId),
          edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
        });
      },
      reset: () => {
        set({
          nodes: [],
          edges: [],
          nodeIDs: {},
        });
      },
      loadDefaultPipeline: () => {
        const isMobile = window.innerWidth < 768;
        const centerX = window.innerWidth / 2 - 100; // Assuming node width ~200px

        const defaultNodes = isMobile ? [
          {
            id: 'input-1',
            type: 'customInput',
            position: { x: centerX, y: 50 },
            data: { id: 'input-1', nodeType: 'customInput', inputName: 'User Query' }
          },
          {
            id: 'text-1',
            type: 'text',
            position: { x: centerX, y: 250 },
            data: { id: 'text-1', nodeType: 'text', text: 'Analyze this: {{query}}' }
          },
          {
            id: 'llm-1',
            type: 'llm',
            position: { x: centerX, y: 450 },
            data: { id: 'llm-1', nodeType: 'llm' }
          },
          {
            id: 'output-1',
            type: 'customOutput',
            position: { x: centerX, y: 650 },
            data: { id: 'output-1', nodeType: 'customOutput', outputName: 'Final Result' }
          }
        ] : [
          {
            id: 'input-1',
            type: 'customInput',
            position: { x: 50, y: 150 },
            data: { id: 'input-1', nodeType: 'customInput', inputName: 'User Query' }
          },
          {
            id: 'text-1',
            type: 'text',
            position: { x: 50, y: 400 },
            data: { id: 'text-1', nodeType: 'text', text: 'Analyze this: {{query}}' }
          },
          {
            id: 'llm-1',
            type: 'llm',
            position: { x: 450, y: 250 },
            data: { id: 'llm-1', nodeType: 'llm' }
          },
          {
            id: 'output-1',
            type: 'customOutput',
            position: { x: 1000, y: 300 },
            data: { id: 'output-1', nodeType: 'customOutput', outputName: 'Final Result' }
          }
        ];

        const defaultEdges = [
          {
            id: 'e-input-llm',
            source: 'input-1',
            target: 'llm-1',
            sourceHandle: 'input-1-value',
            targetHandle: 'llm-1-system',
            type: 'simplebezier',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 }
          },
          {
            id: 'e-text-llm',
            source: 'text-1',
            target: 'llm-1',
            sourceHandle: 'text-1-output',
            targetHandle: 'llm-1-prompt',
            type: 'simplebezier',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 }
          },
          {
            id: 'e-llm-output',
            source: 'llm-1',
            target: 'output-1',
            sourceHandle: 'llm-1-response',
            targetHandle: 'output-1-value',
            type: 'simplebezier',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 }
          }
        ];

        set({
          nodes: defaultNodes,
          edges: defaultEdges,
          nodeIDs: {
            customInput: 1,
            llm: 1,
            text: 1,
            customOutput: 1
          }
        });
      },
    }),
    {
      name: "pipeline-storage",
    }
  )
);
