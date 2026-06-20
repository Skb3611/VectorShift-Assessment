import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-background overflow-hidden">
      <PipelineToolbar />
      <main className="flex-1 relative overflow-hidden">
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
