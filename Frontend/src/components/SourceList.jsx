import React from 'react';

export default function SourceList({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="custom-card mb-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0 text-primary d-flex align-items-center gap-2">
          <i className="bi bi-file-earmark-text-fill"></i>
          <span>Nguồn Văn bản Tham khảo (Top-{sources.length} Context Nodes)</span>
        </h5>
        <span className="badge bg-primary rounded-pill px-3 py-1.5">{sources.length} Passages Found</span>
      </div>

      <div className="row">
        {sources.map((src, idx) => (
          <div className="col-12 mb-3" key={src.node_id || idx}>
            <div className="source-card">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="fw-bold mb-1 text-dark">
                    <i className="bi bi-journal-bookmark me-1.5 text-primary"></i>
                    Top {idx + 1}: {src.title || src.file_name}
                  </h6>
                  <span className="small text-muted">File: {src.file_name}</span>
                </div>
                <span className="badge-score">
                  <i className="bi bi-speedometer2 me-1"></i>
                  Similarity Score: {src.score}
                </span>
              </div>

              {/* Metadata Badges (Task 4) */}
              {src.metadata && Object.keys(src.metadata).length > 0 && (
                <div className="mb-2">
                  {Object.entries(src.metadata).map(([k, v]) => (
                    <span className="badge-meta" key={k}>
                      <strong>{k}:</strong> {String(v)}
                    </span>
                  ))}
                </div>
              )}

              {/* Passage text */}
              <div className="p-2.5 bg-white rounded border small text-secondary leading-relaxed">
                {src.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
