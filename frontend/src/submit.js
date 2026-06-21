// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { Button } from './components/ui/button';
import { Play, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './components/ui/alert-dialog';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
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
                setDialogTitle('Pipeline Analysis');
                setDialogMessage(
                    `Nodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag}`
                );
            } else {
                setDialogTitle('Error');
                setDialogMessage('Failed to parse pipeline. Make sure the backend is running.');
            }
            setDialogOpen(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setDialogTitle('Error');
            setDialogMessage('Error connecting to the backend.');
            setDialogOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-[200px] sm:max-w-none sm:w-auto px-4 sm:px-0">
                <Button 
                    onClick={handleSubmit}
                    variant="default"
                    size="lg"
                    disabled={loading}
                    className="w-full sm:w-auto gap-2 border border-border"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    ) : (
                        <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    )}
                    {loading ? 'Analyzing...' : 'Run Analysis'}
                </Button>
            </div>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                        <AlertDialogDescription className="whitespace-pre-line">
                            {dialogMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setDialogOpen(false)}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
