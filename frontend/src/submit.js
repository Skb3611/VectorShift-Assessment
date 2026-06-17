// submit.js
import { useStore } from './store';
import { Button } from './components/ui/button';
import { Play } from 'lucide-react';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        const pipelineData = {
            nodes: nodes.map(n => ({ id: n.id })),
            edges: edges.map(e => ({ source: e.source, target: e.target }))
        };

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10">
            <Button 
                onClick={handleSubmit}
                className="h-14 px-10 rounded-2xl shadow-2xl shadow-primary/20 gap-3 text-base font-bold transition-all active:scale-95 bg-slate-900 hover:bg-slate-800"
            >
                <Play className="w-5 h-5 fill-current" />
                Run Analysis
            </Button>
        </div>
    );
}
