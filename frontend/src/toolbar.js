// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { Button } from './components/ui/button';
import { RotateCcw } from 'lucide-react';

export const PipelineToolbar = () => {
    const reset = useStore((state) => state.reset);

    return (
        <div className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
                <div className="pr-4 mr-4 border-r border-slate-200">
                    <h1 className="text-sm font-bold text-slate-900 tracking-tight">Pipeline Builder</h1>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest text-primary">v2.0 Beta</p>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
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
            
            <Button 
                variant="outline"
                size="sm"
                onClick={reset}
                className="gap-2 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all active:scale-95"
            >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Canvas
            </Button>
        </div>
    );
};
