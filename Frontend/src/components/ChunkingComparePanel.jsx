import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function ChunkingComparePanel() {
  const [query, setQuery] = useState('Quy trình 4 bước tiến hành cuộc họp xử lý kỷ luật lao động gồm những gì?');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChunkingCompare = async (testQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.post('/api/chunking-compare', {
        query: testQuery || query,
        chunk_sizes: [128, 256, 1024, 0],
      });
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChunkingCompare();
  }, []);

  const handleRun = (e) => {
    e.preventDefault();
    fetchChunkingCompare();
  };

  return (
    <div className="custom-card mb-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-primary mb-1">
            <i className="bi bi-scissors me-2"></i>
            Task 3 – Thử nghiệm Semantic Chunking & So sánh Chunk Size
          </h4>
          <p className="text-muted small mb-0">
            So sánh hiệu năng phân đoạn văn bản dài (Nội quy Kỷ luật Lao động) giữa các kích thước chunk 128, 256, 1024 tokens và Full Document.
          </p>
        </div>
        <button className="btn btn-outline-primary rounded-pill px-3" onClick={() => fetchChunkingCompare()} disabled={loading}>
          <i className="bi bi-arrow-repeat me-1"></i> Chạy lại Benchmark
        </button>
      </div>

      <form onSubmit={handleRun} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-custom"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập câu hỏi test cho Task 3..."
          />
          <button type="submit" className="btn btn-primary-custom" disabled={loading}>
            {loading ? 'Đang đo đạc...' : 'Chạy Thực nghiệm'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {data && (
        <>
          {/* Bảng tổng hợp số liệu thực nghiệm */}
          <div className="table-responsive mb-4">
            <table className="table table-hover table-bordered align-middle text-center bg-white shadow-sm rounded-3 overflow-hidden">
              <thead className="table-primary">
                <tr>
                  <th>Chunk Size</th>
                  <th>Tổng số Chunks</th>
                  <th>Độ dài TB (kí tự)</th>
                  <th>Retrieval Latency</th>
                  <th>Top Score</th>
                  <th>Retrieval Precision</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((r, idx) => (
                  <tr key={idx} className={r.chunk_size === 256 ? 'table-success fw-bold' : ''}>
                    <td>
                      {r.chunk_size > 0 ? (
                        <span className="badge bg-primary px-2.5 py-1.5 fs-6">{r.chunk_size} tokens</span>
                      ) : (
                        <span className="badge bg-secondary px-2.5 py-1.5 fs-6">Unchunked (Full)</span>
                      )}
                      {r.chunk_size === 256 && <span className="ms-2 badge bg-success">Tối ưu nhất</span>}
                    </td>
                    <td>{r.total_chunks} chunks</td>
                    <td>{r.avg_chunk_char_length} chars</td>
                    <td>{r.retrieval_time_ms} ms</td>
                    <td><span className="badge-score">{r.top_score}</span></td>
                    <td>
                      <div className="progress" style={{ height: '22px' }}>
                        <div
                          className={`progress-bar ${
                            r.precision_percent >= 90
                              ? 'bg-success'
                              : r.precision_percent >= 75
                              ? 'bg-info'
                              : 'bg-warning'
                          }`}
                          style={{ width: `${r.precision_percent}%` }}
                        >
                          {r.precision_percent}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Khối xem chi tiết retrieved text & answer */}
          <div className="row g-3">
            {data.results.map((r, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="card h-100 border-0 shadow-sm bg-light">
                  <div className="card-header bg-white fw-bold d-flex justify-content-between">
                    <span>
                      <i className="bi bi-box-seam me-1 text-primary"></i>
                      Cấu hình: {r.chunk_size > 0 ? `${r.chunk_size} tokens` : 'Full Document'}
                    </span>
                    <span className="text-muted small">Precision: {r.precision_percent}%</span>
                  </div>
                  <div className="card-body">
                    <h6 className="small fw-bold text-secondary">Ngữ cảnh Trích xuất (Retrieved Passage Snippet):</h6>
                    <p className="small text-dark p-2 bg-white rounded border mb-2 font-monospace">
                      {r.retrieved_text}
                    </p>
                    <h6 className="small fw-bold text-success">Câu trả lời tạo ra:</h6>
                    <p className="small text-dark mb-0 style-answer" style={{ whiteSpace: 'pre-line' }}>
                      {r.generated_answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
