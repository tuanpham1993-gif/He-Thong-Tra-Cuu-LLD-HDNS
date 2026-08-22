import React, { useState } from 'react';
import QueryForm from '../components/QueryForm';
import AnswerCard from '../components/AnswerCard';
import SourceList from '../components/SourceList';
import RagVsNonRagCompare from '../components/RagVsNonRagCompare';
import axiosClient from '../api/axiosClient';

/**
 * Trang HomePage (Màn hình chính thực hiện Task 2 & Task 4):
 * Gửi câu hỏi RAG kèm bộ lọc Metadata, nhận câu trả lời AI trích dẫn văn bản pháp luật,
 * đồng thời đối sánh với chế độ Non-RAG để minh họa phát hiện lỗi ảo giác (Hallucination).
 */
export default function HomePage() {
  const [result, setResult] = useState(null);       // Kết quả truy vấn RAG chính
  const [nonRagResult, setNonRagResult] = useState(null); // Kết quả Non-RAG phục vụ bảng so sánh Task 2
  const [loading, setLoading] = useState(false);   // Trạng thái đang tải dữ liệu từ API
  const [error, setError] = useState(null);         // Trạng thái thông báo lỗi (nếu có)

  // Xử lý sự kiện Submit câu hỏi từ QueryForm
  const handleQuery = async (queryPayload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setNonRagResult(null);

    try {
      // 1. Gửi request gọi RAG Query API (/api/query)
      const ragRes = await axiosClient.post('/api/query', queryPayload);
      setResult(ragRes);

      // 2. Nếu ở chế độ RAG, gọi song song API với use_rag=false để lấy bằng chứng đối sánh Hallucination (Task 2)
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
      {/* Banner giới thiệu tính năng Trợ lý Số RAG */}
      <div className="alert alert-primary border-0 shadow-sm mb-4 rounded-3 p-3 d-flex align-items-center gap-3">
        <i className="bi bi-info-circle-fill fs-3 text-primary"></i>
        <div>
          <h6 className="fw-bold mb-1">Trợ lý Số Tra cứu Luật Lao động 2019 & Hợp đồng Nhân sự (RAG System)</h6>
          <p className="small mb-0 text-muted">
            Hệ thống hỗ trợ HR và Người lao động tra cứu chính xác thời hạn báo trước, chế độ thai sản, tiền lương làm thêm giờ (150%, 200%, 300%) và quy trình kỷ luật lao động.
          </p>
        </div>
      </div>

      {/* Form nhập câu hỏi & bộ lọc Metadata (Task 4) */}
      <QueryForm onSubmit={handleQuery} loading={loading} />

      {/* Thông báo lỗi nếu xảy ra sự cố */}
      {error && (
        <div className="alert alert-danger shadow-sm mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {/* Card hiển thị câu trả lời chính của AI */}
      {result && <AnswerCard result={result} />}

      {/* Bảng so sánh phát hiện lỗi ảo giác RAG vs Non-RAG (Task 2) */}
      {result && result.mode === 'rag' && nonRagResult && (
        <RagVsNonRagCompare ragResult={result} nonRagResult={nonRagResult} />
      )}

      {/* Danh sách các đoạn văn bản gốc được trích dẫn (Source Nodes) */}
      {result && result.sources && <SourceList sources={result.sources} />}
    </div>
  );
}
