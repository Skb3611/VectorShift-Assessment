import { Handle } from 'reactflow';
import { cn } from '../lib/utils';
import { useStore } from '../store';
import { X } from 'lucide-react';

export const BaseNode = ({ id, label, children, handles = [], selected }) => {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div className={cn(
      "min-w-[160px] md:min-w-[200px] min-h-[70px] md:min-h-[80px] bg-white rounded-xl border-2 shadow-sm transition-all duration-200 flex flex-col gap-2 p-3 group",
      selected ? "border-primary ring-2 ring-primary/20 shadow-md" : "border-slate-200 hover:border-slate-300"
    )}>
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          className={cn(
            "!w-4 !h-4 !border-2 !border-white !transition-colors !duration-200",
            handle.type === 'source' ? "!bg-primary hover:!bg-blue-600" : "!bg-slate-400 hover:!bg-slate-500"
          )}
          style={{ 
            ...handle.style 
          }}
        />
      ))}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <button 
          onClick={() => deleteNode(id)}
          className="p-1 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete Node"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};
