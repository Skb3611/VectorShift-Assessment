// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { Button } from './components/ui/button';
import { RotateCcw, FileJson } from 'lucide-react';

export const PipelineToolbar = () => {
    const reset = useStore((state) => state.reset);
    const loadDefault = useStore((state) => state.loadDefaultPipeline);

    return (
        <div className="sticky top-0 z-20 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between">
            
            {/* Logo and Nodes Row */}
            <div className="flex items-center flex-1 min-w-0 py-3 md:py-4">
                <div className="flex items-center gap-2 px-4 md:px-6 border-r border-slate-200 dark:border-slate-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white hidden xs:inline whitespace-nowrap">Pipeline Builder</span>
                </div>

                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar touch-pan-x flex-1 px-4">
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
            </div>
            
            {/* Action Buttons Row - Separate line on mobile, right side on desktop */}
            <div className="flex items-center justify-center md:justify-end gap-2 p-3 md:p-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 md:bg-transparent md:dark:bg-transparent shrink-0">
                <Button 
                    variant="ghost"
                    size="sm"
                    onClick={loadDefault}
                    className="gap-2 md:gap-0 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all active:scale-95 text-xs whitespace-nowrap flex md:w-9 md:h-9 md:p-0"
                    title="Load Example"
                >
                    <FileJson className="w-4 h-4 md:w-4 md:h-4" />
                    <span className="md:hidden">Load Example</span>
                </Button>
                <Button 
                    variant="outline"
                    size="sm"
                    onClick={reset}
                    className="gap-2 md:gap-0 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30 border-slate-200 dark:border-slate-800 transition-all active:scale-95 text-xs whitespace-nowrap flex md:w-9 md:h-9 md:p-0"
                    title="Reset Canvas"
                >
                    <RotateCcw className="w-4 h-4 md:w-4 md:h-4" />
                    <span className="md:hidden">Reset Canvas</span>
                </Button>
            </div>
        </div>
    );
};
