// draggableNode.js

import { useStore } from './store';

export const DraggableNode = ({ type, label }) => {
    const addNode = useStore((state) => state.addNode);
    const getNodeID = useStore((state) => state.getNodeID);

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const handlePointerDown = () => {
      // For mobile/touch: Add node to center of screen on tap
      // We use pointerDown to ensure it works across all touch/mouse devices
      
      // If it's a touch or a simple click, we can trigger the add
      // We'll wait a bit to see if a drag starts, but for simplicity:
      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position: { 
          x: window.innerWidth / 4 + Math.random() * 50, 
          y: window.innerHeight / 4 + Math.random() * 50 
        },
        data: { id: nodeID, nodeType: `${type}` },
      };
      addNode(newNode);
    };
  
    return (
      <div
        className="flex flex-col items-center justify-center min-w-[80px] h-[40px] px-4 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold cursor-grab transition-all hover:border-primary hover:text-primary hover:shadow-sm active:scale-95 active:bg-slate-50 select-none touch-manipulation"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onPointerDown={handlePointerDown}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };
  