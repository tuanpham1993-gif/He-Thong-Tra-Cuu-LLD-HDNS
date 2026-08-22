import React, { useState } from 'react';
import ChunkingComparePanel from '../components/ChunkingComparePanel';
import EmbeddingComparePanel from '../components/EmbeddingComparePanel';

export default function ComparePage() {
  const [subTab, setSubTab] = useState('chunking');

  return (
    <div>
      <div className="d-flex gap-2 mb-4">
        <button
          className={`btn ${subTab === 'chunking' ? 'btn-primary fw-bold' : 'btn-outline-secondary'} px-4 py-2 rounded-pill`}
          onClick={() => setSubTab('chunking')}
        >
          <i className="bi bi-scissors me-2"></i>
          Task 3: So sánh Semantic Chunking
        </button>
        <button
          className={`btn ${subTab === 'embedding' ? 'btn-primary fw-bold' : 'btn-outline-secondary'} px-4 py-2 rounded-pill`}
          onClick={() => setSubTab('embedding')}
        >
          <i className="bi bi-cpu-fill me-2"></i>
          Task 5: So sánh Embedding Models
        </button>
      </div>

      {subTab === 'chunking' && <ChunkingComparePanel />}
      {subTab === 'embedding' && <EmbeddingComparePanel />}
    </div>
  );
}
