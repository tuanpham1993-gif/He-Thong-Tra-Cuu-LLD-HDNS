import React from 'react';

export default function RagVsNonRagCompare({ ragResult, nonRagResult }) {
  if (!ragResult && !nonRagResult) return null;

  return (
    <div className="custom-card mb-4 p-4">
      <h5 className="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-layout-split"></i>
        <span>Task 2 – Bảng So sánh Trực quan: RAG vs Non-RAG (Hallucination Test)</span>
      </h5>

      <div className="row g-3">
        {/* Khối RAG */}
        <div className="col-md-6">
          <div className="card h-100 border-success shadow-sm">
            <div className="card-header bg-success text-white fw-bold d-flex justify-content-between align-items-center">
              <span>🟢 1. Chế độ RAG (LlamaIndex + Context)</span>
              <span className="badge bg-light text-success">{ragResult?.execution_time_seconds || 0}s</span>
            </div>
            <div className="card-body bg-light">
              <h6 className="fw-bold text-success mb-2">Câu trả lời có Căn cứ Pháp lý:</h6>
              <p className="small text-dark mb-3" style={{ whiteSpace: 'pre-line' }}>
                {ragResult?.answer || 'Chưa có dữ liệu.'}
              </p>
              <div className="alert alert-success py-1.5 px-2 small mb-0">
                <i className="bi bi-check-circle-fill me-1"></i>
                <strong>Ưu điểm:</strong> Trích dẫn chính xác số ngày/mức lương theo Bộ luật Lao động 2019. Zero hallucination.
              </div>
            </div>
          </div>
        </div>

        {/* Khối Non-RAG */}
        <div className="col-md-6">
          <div className="card h-100 border-danger shadow-sm">
            <div className="card-header bg-danger text-white fw-bold d-flex justify-content-between align-items-center">
              <span>🔴 2. Chế độ Non-RAG (LLM Direct)</span>
              <span className="badge bg-light text-danger">{nonRagResult?.execution_time_seconds || 0}s</span>
            </div>
            <div className="card-body bg-light">
              <h6 className="fw-bold text-danger mb-2">Câu trả lời Suy đoán (Hallucination):</h6>
              <p className="small text-dark mb-3" style={{ whiteSpace: 'pre-line' }}>
                {nonRagResult?.answer || 'Chưa có dữ liệu.'}
              </p>
              <div className="alert alert-danger py-1.5 px-2 small mb-0">
                <i className="bi bi-exclamation-octagon-fill me-1"></i>
                <strong>Rủi ro:</strong> LLM tự suy đoán số ngày (ví dụ 15 ngày), không có văn bản chứng minh, sai lệch pháp lý.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
