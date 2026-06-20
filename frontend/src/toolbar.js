// toolbar.js

import { DraggableNode } from "./draggableNode";
import { useStore } from "./store";
import { Button } from "./components/ui/button";
import { RotateCcw, FileJson, Workflow } from "lucide-react";

import { AnimatedThemeToggler } from "./components/theme-toggle";

export const PipelineToolbar = () => {
  const reset = useStore((state) => state.reset);
  const loadDefault = useStore((state) => state.loadDefaultPipeline);

  return (
    <div className="fixed bottom-0 z-20 w-full bg-card/90 backdrop-blur-md border-t border-border shadow-sm transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between">
      {/* Logo and Nodes Row */}
      <div className="flex items-center flex-1 min-w-0 py-3 md:py-4">
        <div className="md:flex items-center gap-2 px-4 md:px-6 border-r border-border shrink-0 hidden ">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <Workflow className="w-6 h-6" />
          </div>

        </div>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar touch-pan-x flex-1 px-4">
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="note" label="Note" />
          <DraggableNode type="filter" label="Filter" />
          <DraggableNode type="logic" label="Logic" />
          <DraggableNode type="transform" label="Transform" />
          <DraggableNode type="action" label="Action" />
        </div>
      </div>

      {/* Action Buttons Row - Separate line on mobile, right side on desktop */}
      <div className="flex items-center justify-center md:justify-end gap-2 p-3 md:p-4 border-t md:border-t-0 md:border-l border-border bg-muted/50 md:bg-transparent shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={loadDefault}
          className="gap-2 md:gap-0 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all active:scale-95 text-xs whitespace-nowrap flex md:w-9 md:h-9 md:p-0"
          title="Load Example"
        >
          <FileJson className="w-4 h-4 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={reset}
          className="gap-2 md:gap-0 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all active:scale-95 text-xs whitespace-nowrap flex md:w-9 md:h-9 md:p-0"
          title="Reset Canvas"
        >
          <RotateCcw className="w-4 h-4 md:w-4 md:h-4" />
         
        </Button>
        <AnimatedThemeToggler
          variant="ghost"
          size="icon"
          className="gap-2 md:gap-0 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all active:scale-95 text-xs whitespace-nowrap flex md:w-9 md:h-9 md:h-9 md:w-9 md:p-0 rounded-md"
          title="Toggle Theme"
        />
      </div>
    </div>
  );
};
