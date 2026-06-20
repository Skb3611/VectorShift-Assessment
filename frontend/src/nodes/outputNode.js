// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Input } from '../components/ui/input';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <BaseNode id={id} label="Output" handles={handles} selected={selected}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight">
            Name
          </label>
          <Input 
            value={currName} 
            onChange={handleNameChange} 
            className="h-8 text-xs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight">
            Type
          </label>
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            className="w-full px-2 py-1.5 text-xs bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all cursor-pointer"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
}
