// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="flex flex-col items-center justify-center min-w-[80px] h-[40px] px-4 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold cursor-grab transition-all hover:border-primary hover:text-primary hover:shadow-sm active:scale-95 select-none"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };
  