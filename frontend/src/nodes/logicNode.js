import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LogicNode = ({ id, data, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'true', style: { top: '30%' } },
    { type: 'source', position: Position.Right, id: 'false', style: { top: '70%' } }
  ];

  return (
    <BaseNode id={id} label="Logic" handles={handles} selected={selected}>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-slate-600 leading-relaxed italic">
          Branching logic based on input.
        </p>
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
          <span>False</span>
          <span>True</span>
        </div>
      </div>
    </BaseNode>
  );
};
