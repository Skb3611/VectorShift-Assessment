// textNode.js

import { useState, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables from text like {{var1}}, {{var2}}
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }
    return Array.from(matches);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const handles = useMemo(() => {
    const dynamicHandles = variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: varName,
      style: { 
        top: `${(index + 1) * (100 / (variables.length + 1))}%` 
      }
    }));

    return [
      ...dynamicHandles,
      { type: 'source', position: Position.Right, id: 'output' }
    ];
  }, [variables]);

  return (
    <BaseNode id={id} label="Text" handles={handles} selected={selected}>
      <div className="flex flex-col gap-1 w-full h-full">
        <label className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">
          Text
        </label>
        <textarea 
          value={currText} 
          onChange={handleTextChange} 
          className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none overflow-hidden min-h-[40px] font-sans"
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
            
            const parent = e.target.closest('.react-flow__node');
            if (parent) {
              const currentWidth = parent.offsetWidth;
              if (e.target.scrollWidth > currentWidth - 20) {
                parent.style.width = (e.target.scrollWidth + 40) + 'px';
              }
            }
          }}
        />
      </div>
    </BaseNode>
  );
}
