import React from 'react';
import { useParams } from 'react-router-dom';

export default function NoteDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Note {id}</h1>
      <div className="mt-4">
        {/* Note detail content will go here */}
      </div>
    </div>
  );
} 