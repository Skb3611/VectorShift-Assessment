// submit.js
import { useStore } from './store';
import { Button } from './components/ui/button';
import { Play } from 'lucide-react';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
        
        const pipelineData = {
            nodes: nodes.map(n => ({ id: n.id })),
            edges: edges.map(e => ({ source: e.source, target: e.target }))
        };

        try {
            const response = await fetch(`${backendUrl}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Pipeline Analysis:\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag}`);
            } else {
                alert('Failed to parse pipeline. Make sure the backend is running.');
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error connecting to the backend.');
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-[280px] sm:max-w-none sm:w-auto px-4 sm:px-0">
            <Button 
                onClick={handleSubmit}
                className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-10 rounded-xl md:rounded-2xl shadow-2xl shadow-primary/20 gap-2 md:gap-3 text-sm md:text-base font-bold transition-all active:scale-95 bg-slate-900 hover:bg-slate-800"
            >
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                Run Analysis
            </Button>
        </div>
    );
}
