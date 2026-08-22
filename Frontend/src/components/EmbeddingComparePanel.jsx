import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function EmbeddingComparePanel() {
  const [query, setQuery] = useState('Nữ lao động sinh con được nghỉ chế độ thai sản bao lâu?');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmbeddingCompare = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.post('/api/embedding-compare', {
        query: query,
        models: [
          'sentence-transformers/all-MiniLM-L6-v2',
          'BAAI/bge-small-en-v1.5'
        ],
      });
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmbeddingCompare();
  }, []);

  return (
    <div className="custom-card mb-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-primary mb-1">
            <i className="bi bi-cpu-fill me-2"></i>
            Task 5 – Thực nghiệm & So sánh 2 Embedding Models
          </h4>
          <p className="text-muted small mb-0">
            So sánh <code>BAAI/bge-small-en-v1.5</code> và <code>sentence-transformers/all-MiniLM-L6-v2</code> về thời gian indexing, retrieval latency và độ tương đồng vector (Top Score).
          </p>
        </div>
        <button className="btn btn-outline-primary rounded-pill px-3" onClick={fetchEmbeddingCompare} disabled={loading}>
          <i className="bi bi-arrow-repeat me-1"></i> Chạy lại Benchmark
        </button>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-custom"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập câu hỏi test Task 5..."
          />
          <button className="btn btn-primary-custom" onClick={fetchEmbeddingCompare} disabled={loading}>
            {loading ? 'Đang so sánh...' : 'So sánh Models'}
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {data && (
        <>
          {/* Bảng so sánh 2 Models */}
          <div className="table-responsive mb-4">
            <table className="table table-hover table-bordered text-center bg-white shadow-sm rounded-3 overflow-hidden align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Mô hình Embedding</th>
                  <th>Kích thước Vector</th>
                  <th>Thời gian Indexing</th>
                  <th>Retrieval Latency</th>
                  <th>Top Similarity Score</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((r, idx) => (
                  <tr key={idx} className={r.model_name.includes('bge') ? 'table-info' : ''}>
                    <td className="fw-bold text-start ps-3">
                      <i className="bi bi-layers-half me-2 text-primary"></i>
                      {r.model_name}
                      {r.model_name.includes('bge') && (
                        <span className="ms-2 badge bg-primary">Khuyên dùng</span>
                      )}
                    </td>
                    <td><span className="badge bg-secondary">{r.dimension} dims</span></td>
                    <td>{r.indexing_time_ms} ms</td>
                    <td>{r.retrieval_time_ms} ms</td>
                    <td><span className="badge-score">{r.top_score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Đánh giá & Khuyên dùng chuyên môn */}
          <div className="alert alert-primary border-0 p-3 rounded-3 shadow-sm">
            <h6 className="fw-bold text-primary mb-2">
              <i className="bi bi-lightbulb-fill me-2 text-warning"></i>
              Đánh giá Chuyên môn & Kết luận Task 5:
            </h6>
            <p className="mb-0 small text-dark leading-relaxed style-answer" style={{ whiteSpace: 'pre-line' }}>
              {data.recommendation}
            </p>
          </div>

          {/* Trích đoạn Retrieved Text mẫu */}
          <div className="row g-3 mt-2">
            {data.results.map((r, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="card h-100 border-0 bg-light p-3 rounded-3">
                  <h6 className="fw-bold text-secondary mb-1">
                    {r.model_name}:
                  </h6>
                  <p className="small text-dark p-2 bg-white rounded border mb-0 font-monospace">
                    {r.retrieved_text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
