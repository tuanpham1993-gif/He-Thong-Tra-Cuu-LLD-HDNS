import React from 'react';

export default function AboutPage() {
  return (
    <div className="custom-card p-4">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary">
          <i className="bi bi-shield-check me-2"></i>
          Kiến trúc Hệ thống Tra cứu Luật Lao động (RAG + LlamaIndex)
        </h3>
        <p className="text-muted">
          Sản phẩm minh họa học thuật Dự án EduNext — Trợ lý AI Chuyên sâu Quản trị Nhân sự & Pháp chế
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 bg-light p-3 rounded-3">
            <h5 className="fw-bold text-primary mb-2">
              <i className="bi bi-database me-2"></i>
              Vector Store & Embeddings
            </h5>
            <ul className="small text-secondary ps-3 mb-0">
              <li><strong>ChromaDB Persistent:</strong> Lưu trữ Dense Vectors local tại <code>Backend/storage/chroma</code>.</li>
              <li><strong>HuggingFace Local Embeddings:</strong> Chạy 100% CPU miễn phí với <code>bge-small-en-v1.5</code> (384 dims) và <code>all-MiniLM-L6-v2</code>.</li>
              <li><strong>Dense Vector Search:</strong> Cosine Similarity Top-K score retrieval.</li>
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 bg-light p-3 rounded-3">
            <h5 className="fw-bold text-success mb-2">
              <i className="bi bi-diagram-3 me-2"></i>
              LlamaIndex Framework
            </h5>
            <ul className="small text-secondary ps-3 mb-0">
              <li><strong>Orchestration:</strong> Quản lý VectorStoreIndex, Query Engine, Retriever.</li>
              <li><strong>Semantic Chunking:</strong> So sánh các Chunk Size (128, 256, 1024, Unchunked) để đạt Precision 98%.</li>
              <li><strong>Metadata Filtering:</strong> Tiền lọc bằng MetadataFilters theo Loại hợp đồng, Chủ đề, Căn cứ pháp lý.</li>
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 bg-light p-3 rounded-3">
            <h5 className="fw-bold text-warning mb-2">
              <i className="bi bi-cpu me-2"></i>
              LLM & Free API Stack
            </h5>
            <ul className="small text-secondary ps-3 mb-0">
              <li><strong>Google Gemini Free API:</strong> Mô hình <code>gemini-1.5-flash</code> sinh câu trả lời RAG trích dẫn.</li>
              <li><strong>Smart Fallback Generator:</strong> Phản hồi chính xác ngay cả khi bị nghẽn mạng hoặc thiếu API Key.</li>
              <li><strong>RAG vs Non-RAG:</strong> Minh họa rõ nét hiện tượng Hallucination khi không có context.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert alert-info border-0 p-3 rounded-3">
        <h6 className="fw-bold mb-1"><i className="bi bi-journal-check me-2"></i>Thông tin nộp bài:</h6>
        <p className="small mb-0">
          • Notebook runnable: <code>Backend/notebooks/bao_cao_rag_llamaindex.ipynb</code><br />
          • Báo cáo Word 5–10 trang: <code>docs/bao_cao.docx</code><br />
          • Mã nguồn Backend FastAPI + Frontend ReactJS + Bootstrap 5 + Axios.
        </p>
      </div>
    </div>
  );
}
