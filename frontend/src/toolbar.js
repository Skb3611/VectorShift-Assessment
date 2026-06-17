// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { Button } from './components/ui/button';
import { RotateCcw } from 'lucide-react';

export const PipelineToolbar = () => {
    const reset = useStore((state) => state.reset);

    return (
        <div className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="hidden sm:block pr-4 border-r border-slate-200">
                    <h1 className="text-sm font-bold text-slate-900 tracking-tight">Pipeline Builder</h1>
                    <p className="text-[10px] text-primary font-medium uppercase tracking-widest">v2.0 Beta</p>
                </div>
                
                {/* Scrollable Node List */}
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:max-w-[500px] md:max-w-none pb-2 sm:pb-0 no-scrollbar touch-pan-x">
                    <div className="flex items-center gap-2 flex-nowrap px-1">
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
            </div>
            
            <Button 
                variant="outline"
                size="sm"
                onClick={reset}
                className="w-full sm:w-auto gap-2 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all active:scale-95 text-xs"
            >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Canvas
            </Button>
        </div>
    );
};
