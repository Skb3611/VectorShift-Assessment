import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const NoteNode = ({ id, data, selected }) => {
  const [note, setNote] = useState(data?.note || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    updateNodeField(id, 'note', e.target.value);
  };

  return (
    <BaseNode id={id} label="Note" handles={[]} selected={selected}>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">
          Note
        </label>
        <textarea 
          placeholder="Add a note..." 
          value={note}
          onChange={handleNoteChange}
          className="w-full px-2 py-1.5 text-xs bg-amber-50/50 border border-amber-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200/50 focus:border-amber-300 transition-all resize-none min-h-[60px] text-slate-700 italic"
        />
      </div>
    </BaseNode>
  );
};
