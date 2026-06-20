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
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-[200px] sm:max-w-none sm:w-auto px-4 sm:px-0">
            <Button 
                onClick={handleSubmit}
                variant="default"
                size="lg"
                className="w-full sm:w-auto gap-2 border border-border"
            >
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                Run Analysis
            </Button>
        </div>
    );
}
