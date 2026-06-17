import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ActionNode = ({ id, data, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'trigger' }
  ];

  return (
    <BaseNode id={id} label="Action" handles={handles} selected={selected}>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] text-slate-500 font-medium italic">
          Trigger an external event or webhook.
        </p>
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all active:scale-95 shadow-sm shadow-indigo-200">
          Run Action
        </button>
      </div>
    </BaseNode>
  );
};
