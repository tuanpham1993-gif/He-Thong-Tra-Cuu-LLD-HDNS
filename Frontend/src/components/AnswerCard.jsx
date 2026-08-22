import React from 'react';

export default function AnswerCard({ result }) {
  if (!result) return null;

  const { answer, mode, execution_time_seconds, sources, comparison } = result;

  return (
    <div className="custom-card mb-4">
      <div className="card-header-gradient d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-robot"></i>
          <span>Kết quả Trợ lý AI Trả lời</span>
        </h5>
        <div className="d-flex align-items-center gap-2">
          <span className={`badge ${mode === 'rag' ? 'bg-success' : 'bg-danger'} px-3 py-2 rounded-pill`}>
            {mode === 'rag' ? '🟢 RAG MODE' : '🔴 NON-RAG MODE'}
          </span>
          <span className="badge bg-light text-dark px-2.5 py-2 rounded-pill">
            <i className="bi bi-clock me-1"></i>
            {execution_time_seconds}s
          </span>
        </div>
      </div>

      <div className="card-body p-4">
        {/* Câu trả lời chính */}
        <div className="p-3 bg-light rounded-3 mb-3 border border-secondary border-opacity-10">
          <h6 className="fw-bold text-secondary mb-2">Trích dẫn & Trả lời từ Hệ thống:</h6>
          <p className="mb-0 fs-6 leading-relaxed style-answer text-dark" style={{ whiteSpace: 'pre-line' }}>
            {answer}
          </p>
        </div>

        {/* Cảnh báo Hallucination nếu có so sánh Non-RAG */}
        {comparison && (
          <div className="hallucination-card mt-3">
            <div className="d-flex align-items-start gap-2">
              <i className="bi bi-exclamation-triangle-fill text-danger fs-5 mt-0.5"></i>
              <div>
                <h6 className="fw-bold text-danger mb-1">Cảnh báo So sánh Hallucination (Non-RAG):</h6>
                <p className="small mb-1 text-dark">
                  <strong>Câu trả lời Không RAG (chỉ dùng LLM):</strong> "{comparison.non_rag_answer}"
                </p>
                <p className="small text-muted mb-0">
                  <i className="bi bi-info-circle me-1"></i>
                  {comparison.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
