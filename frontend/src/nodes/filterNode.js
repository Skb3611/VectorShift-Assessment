import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Input } from '../components/ui/input';

export const FilterNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
    updateNodeField(id, 'condition', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode id={id} label="Filter" handles={handles} selected={selected}>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">
          Condition
        </label>
        <Input 
          value={condition}
          onChange={handleConditionChange}
          placeholder="e.g. x > 10" 
          className="h-8 text-xs font-mono"
        />
      </div>
    </BaseNode>
  );
};
