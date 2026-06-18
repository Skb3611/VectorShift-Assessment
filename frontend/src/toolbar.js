// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { Button } from './components/ui/button';
import { RotateCcw, FileJson } from 'lucide-react';

export const PipelineToolbar = () => {
    const reset = useStore((state) => state.reset);
    const loadDefault = useStore((state) => state.loadDefaultPipeline);

    return (
        <div className="sticky top-0 z-20 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-300">
        
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar touch-pan-x flex-1 border-r border-slate-200 dark:border-slate-800 px-4">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='logic' label='Logic' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='action' label='Action' />
            </div>
            
            <div className="pl-4 shrink-0 flex items-center gap-2">
                <Button 
                    variant="ghost"
                    size="sm"
                    onClick={loadDefault}
                    className="gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all active:scale-95 text-xs whitespace-nowrap hidden sm:flex"
                >
                    <FileJson className="w-3.5 h-3.5" />
                    <span>Load Example</span>
                </Button>
                <Button 
                    variant="outline"
                    size="sm"
                    onClick={reset}
                    className="gap-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30 border-slate-200 dark:border-slate-800 transition-all active:scale-95 text-xs whitespace-nowrap"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Reset Canvas</span>
                </Button>
            </div>
        </div>
    );
};
