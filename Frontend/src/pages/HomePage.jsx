import React, { useState } from 'react';
import QueryForm from '../components/QueryForm';
import AnswerCard from '../components/AnswerCard';
import SourceList from '../components/SourceList';
import RagVsNonRagCompare from '../components/RagVsNonRagCompare';
import axiosClient from '../api/axiosClient';

export default function HomePage() {
  const [result, setResult] = useState(null);
  const [nonRagResult, setNonRagResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuery = async (queryPayload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setNonRagResult(null);

    try {
      // 1. Gọi RAG Query
      const ragRes = await axiosClient.post('/api/query', queryPayload);
      setResult(ragRes);

      // 2. Nếu đang bật RAG, đồng thời gọi thêm Non-RAG query để làm bằng chứng so sánh (Task 2)
      if (queryPayload.use_rag) {
        const nonRagRes = await axiosClient.post('/api/query', {
          ...queryPayload,
          use_rag: false,
        });
        setNonRagResult(nonRagRes);
      }
    } catch (err) {
      setError(err.message || 'Không thể kết nối Backend Server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="alert alert-primary border-0 shadow-sm mb-4 rounded-3 p-3 d-flex align-items-center gap-3">
        <i className="bi bi-info-circle-fill fs-3 text-primary"></i>
        <div>
          <h6 className="fw-bold mb-1">Trợ lý Số Tra cứu Luật Lao động 2019 & Hợp đồng Nhân sự (RAG System)</h6>
          <p className="small mb-0 text-muted">
            Hệ thống hỗ trợ HR và Người lao động tra cứu chính xác thời hạn báo trước, chế độ thai sản, tiền lương làm thêm giờ (150%, 200%, 300%) và quy trình kỷ luật lao động.
          </p>
        </div>
      </div>

      <QueryForm onSubmit={handleQuery} loading={loading} />

      {error && (
        <div className="alert alert-danger shadow-sm mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {result && <AnswerCard result={result} />}

      {result && result.mode === 'rag' && nonRagResult && (
        <RagVsNonRagCompare ragResult={result} nonRagResult={nonRagResult} />
      )}

      {result && result.sources && <SourceList sources={result.sources} />}
    </div>
  );
}
