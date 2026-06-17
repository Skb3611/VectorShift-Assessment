import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data, selected }) => {
  const [transform, setTransform] = useState(data?.transform || 'uppercase');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTransformChange = (e) => {
    setTransform(e.target.value);
    updateNodeField(id, 'transform', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode id={id} label="Transform" handles={handles} selected={selected}>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">
          Operation
        </label>
        <select 
          value={transform}
          onChange={handleTransformChange}
          className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer font-medium text-slate-700"
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
        </select>
      </div>
    </BaseNode>
  );
};
