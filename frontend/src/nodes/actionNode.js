import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Button } from '../components/ui/button';

export const ActionNode = ({ id, data, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'trigger' }
  ];

  return (
    <BaseNode id={id} label="Action" handles={handles} selected={selected}>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] text-muted-foreground font-medium italic">
          Trigger an external event or webhook.
        </p>
        <Button className="w-full text-xs font-bold" size="sm">
          Run Action
        </Button>
      </div>
    </BaseNode>
  );
};
