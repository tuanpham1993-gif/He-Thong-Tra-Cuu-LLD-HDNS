import React, { useState } from 'react';

export default function QueryForm({ onSubmit, loading }) {
  const [question, setQuestion] = useState('');
  const [useRag, setUseRag] = useState(true);
  const [filters, setFilters] = useState({
    loai_hop_dong: 'toan_bo',
    chu_de: 'toan_bo',
    phap_ly: 'toan_bo',
    doi_tuong: 'toan_bo',
  });

  const sampleQuestions = [
    {
      text: 'Lao động ký hợp đồng 24 tháng muốn nghỉ việc thì phải báo trước bao nhiêu ngày?',
      filter: { loai_hop_dong: 'xac_dinh_thoi_han', chu_de: 'cham_dut_hop_dong' },
    },
    {
      text: 'Chế độ nghỉ thai sản dành cho lao động nữ và nam khi vợ sinh như thế nào?',
      filter: { chu_de: 'thai_san' },
    },
    {
      text: 'Tiền lương làm thêm giờ ngày lễ 30/4 được tính bao nhiêu %?',
      filter: { chu_de: 'tien_luong_thuong' },
    },
    {
      text: 'Quy trình 4 bước tiến hành cuộc họp xử lý kỷ luật lao động gồm những gì?',
      filter: { chu_de: 'ky_luat_lao_dong' },
    },
  ];

  const handleSelectSample = (sample) => {
    setQuestion(sample.text);
    if (sample.filter) {
      setFilters((prev) => ({ ...prev, ...sample.filter }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Clean filters for backend
    const cleanedFilters = {};
    Object.keys(filters).forEach((k) => {
      if (filters[k] && filters[k] !== 'toan_bo' && filters[k] !== 'all') {
        cleanedFilters[k] = filters[k];
      }
    });

    onSubmit({
      question: question.trim(),
      use_rag: useRag,
      filters: Object.keys(cleanedFilters).length > 0 ? cleanedFilters : null,
      top_k: 3,
    });
  };

  return (
    <div className="custom-card mb-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0 text-primary">
          <i className="bi bi-chat-left-quote-fill me-2"></i>
          Nhập câu hỏi Tra cứu Pháp lý
        </h5>
        <div className="form-check form-switch bg-light px-3 py-1.5 rounded-pill border">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="ragToggle"
            checked={useRag}
            onChange={(e) => setUseRag(e.target.checked)}
          />
          <label className="form-check-label fw-bold text-dark" htmlFor="ragToggle">
            {useRag ? '🟢 Chế độ RAG (Có tra cứu context)' : '🔴 Chế độ Non-RAG (LLM trực tiếp)'}
          </label>
        </div>
      </div>

      {/* Gợi ý câu hỏi kiểm thử */}
      <div className="mb-3">
        <span className="small text-muted fw-bold me-2">Gợi ý câu hỏi thử nghiệm:</span>
        <div className="d-flex flex-wrap gap-2 mt-1.5">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-pill text-start"
              onClick={() => handleSelectSample(q)}
            >
              <i className="bi bi-magic me-1"></i>
              {q.text}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control form-control-custom"
            rows="3"
            placeholder="Ví dụ: Người lao động làm thêm giờ vào ngày Tết Nguyên Đán được trả lương bao nhiêu %?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {/* Bộ lọc Metadata (Task 4) */}
        <div className="card bg-light border-0 p-3 mb-3 rounded-3">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-funnel-fill me-2 text-primary"></i>
            <span className="fw-bold small text-uppercase text-secondary">Task 4 – Bộ lọc Metadata (Metadata Filtering)</span>
          </div>
          <div className="row g-2">
            <div className="col-md-3">
              <label className="form-label small text-muted mb-1">Loại hợp đồng:</label>
              <select
                className="form-select form-select-custom form-select-sm"
                value={filters.loai_hop_dong}
                onChange={(e) => setFilters({ ...filters, loai_hop_dong: e.target.value })}
              >
                <option value="toan_bo">-- Tất cả loại HĐ --</option>
                <option value="xac_dinh_thoi_han">Hợp đồng xác định thời hạn</option>
                <option value="khong_xac_dinh_thoi_han">Hợp đồng không xác định thời hạn</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted mb-1">Chủ đề quy định:</label>
              <select
                className="form-select form-select-custom form-select-sm"
                value={filters.chu_de}
                onChange={(e) => setFilters({ ...filters, chu_de: e.target.value })}
              >
                <option value="toan_bo">-- Tất cả chủ đề --</option>
                <option value="cham_dut_hop_dong">Chấm dứt hợp đồng</option>
                <option value="thai_san">Chế độ thai sản</option>
                <option value="tien_luong_thuong">Tiền lương & Làm thêm giờ</option>
                <option value="ky_luat_lao_dong">Kỷ luật lao động</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted mb-1">Căn cứ pháp lý:</label>
              <select
                className="form-select form-select-custom form-select-sm"
                value={filters.phap_ly}
                onChange={(e) => setFilters({ ...filters, phap_ly: e.target.value })}
              >
                <option value="toan_bo">-- Tất cả văn bản --</option>
                <option value="Luat_Lao_Dong_2019">Luật Lao động 2019</option>
                <option value="Luat_Bao_Hiem_Xa_Hoi_2014">Luật BHXH 2014</option>
                <option value="Nghi_dinh_145_2020">Nghị định 145/2020</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted mb-1">Đối tượng:</label>
              <select
                className="form-select form-select-custom form-select-sm"
                value={filters.doi_tuong}
                onChange={(e) => setFilters({ ...filters, doi_tuong: e.target.value })}
              >
                <option value="toan_bo">-- Tất cả đối tượng --</option>
                <option value="nguoi_lao_dong">Người lao động</option>
                <option value="nguoi_su_dung_lao_dong">Người sử dụng lao động</option>
              </select>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary-custom px-4" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Đang xử lý RAG & Truy vấn Vector...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill me-2"></i>
                Gửi câu hỏi tra cứu
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
