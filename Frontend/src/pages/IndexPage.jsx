import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function IndexPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('thời hạn báo trước 30 ngày 45 ngày');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/api/documents');
      setDocuments(res.documents || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleReindex = async () => {
    setReindexing(true);
    setMessage('');
    try {
      const res = await axiosClient.post('/api/index', { reindex: true });
      setMessage(res.message);
      fetchDocuments();
    } catch (err) {
      setMessage(`Lỗi khi Re-index: ${err.message}`);
    } finally {
      setReindexing(false);
    }
  };

  const handleSimilaritySearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    try {
      const res = await axiosClient.post('/api/search-similarity', {
        query: searchQuery,
        top_k: 3,
      });
      setSearchResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div>
      <div className="custom-card mb-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold text-primary mb-1">
              <i className="bi bi-database-fill-gear me-2"></i>
              Task 1 – Dense Vector Indexing & Quản lý Kho Dữ liệu
            </h4>
            <p className="text-muted small mb-0">
              Nạp các tài liệu Luật Lao động, khởi tạo Dense Embeddings và lưu trữ trong ChromaDB Vector Store.
            </p>
          </div>
          <button className="btn btn-warning fw-bold rounded-pill px-4" onClick={handleReindex} disabled={reindexing}>
            {reindexing ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span> Re-Indexing...
              </>
            ) : (
              <>
                <i className="bi bi-arrow-repeat me-1"></i> Xóa & Re-Index Tất cả
              </>
            )}
          </button>
        </div>

        {message && <div className="alert alert-info py-2 small mb-3">{message}</div>}

        <h6 className="fw-bold text-secondary mb-2">Danh sách Tài liệu Pháp lý đang Lưu trữ ({documents.length} files):</h6>
        <div className="row g-3">
          {documents.map((doc, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card h-100 border-0 bg-light p-3 rounded-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0 text-dark">
                    <i className="bi bi-file-earmark-code text-primary me-1"></i>
                    {doc.title || doc.file_name}
                  </h6>
                  <span className="badge bg-secondary">{doc.file_name}</span>
                </div>
                {doc.metadata && (
                  <div className="mb-2">
                    {Object.entries(doc.metadata).map(([k, v]) => (
                      <span className="badge-meta" key={k}>
                        {k}: {String(v)}
                      </span>
                    ))}
                  </div>
                )}
                <p className="small text-muted mb-0 style-answer" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                  {doc.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Công cụ Test Task 1 Vector Similarity Search */}
      <div className="custom-card p-4">
        <h5 className="fw-bold text-primary mb-3">
          <i className="bi bi-speedometer2 me-2"></i>
          Thử nghiệm Task 1 – Dense Cosine Similarity Search Top-K
        </h5>
        <form onSubmit={handleSimilaritySearch} className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-custom"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập truy vấn vector..."
            />
            <button className="btn btn-primary-custom" type="submit" disabled={searchLoading}>
              {searchLoading ? 'Đang truy vấn...' : 'Đo Similarity Top-K'}
            </button>
          </div>
        </form>

        {searchResults && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold text-success small">Latency truy vấn: {searchResults.execution_time_ms} ms</span>
              <span className="badge bg-primary">Top {searchResults.results.length} Nodes</span>
            </div>
            <div className="row g-2">
              {searchResults.results.map((res, idx) => (
                <div className="col-12" key={idx}>
                  <div className="p-3 bg-light rounded border d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">
                        Top {idx + 1}: {res.title} ({res.file_name})
                      </h6>
                      <p className="small text-muted mb-0">{res.text.substring(0, 150)}...</p>
                    </div>
                    <span className="badge-score fs-6">Score: {res.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
