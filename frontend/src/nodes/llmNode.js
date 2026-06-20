// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system', style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode id={id} label="LLM" handles={handles} selected={selected}>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Large Language Model component. Receives system instructions and user prompts.
        </p>
        <div className="mt-2 py-1 px-2 bg-primary/10 rounded border border-primary/20">
          <span className="text-[10px] font-semibold text-primary uppercase">Ready</span>
        </div>
      </div>
    </BaseNode>
  );
}
