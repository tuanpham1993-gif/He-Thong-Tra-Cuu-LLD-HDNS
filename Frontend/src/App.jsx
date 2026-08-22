import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import IndexPage from './pages/IndexPage';
import ChunkingComparePanel from './components/ChunkingComparePanel';
import EmbeddingComparePanel from './components/EmbeddingComparePanel';
import AboutPage from './pages/AboutPage';

/**
 * Component App chính:
 * Quản lý trạng thái chuyển Tab giữa các màn hình ứng dụng tương ứng với 5 Task bài tập RAG.
 */
function App() {
  // Quản lý tab đang được chọn (Mặc định: 'home' - Tra cứu RAG & So sánh Non-RAG)
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Thanh điều hướng Topbar nhận activeTab và hàm chuyển tab */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Màn hình hiển thị nội dung tùy theo Tab được chọn */}
      <main className="container pb-5 flex-grow-1">
        {activeTab === 'home' && <HomePage />}             {/* Task 2 & Task 4: Tra cứu RAG & Metadata Filter */}
        {activeTab === 'index' && <IndexPage />}           {/* Task 1: Quản lý Index & Vector Search */}
        {activeTab === 'chunking' && <ChunkingComparePanel />} {/* Task 3: So sánh Semantic Chunking */}
        {activeTab === 'embedding' && <EmbeddingComparePanel />} {/* Task 5: So sánh Embedding Models */}
        {activeTab === 'about' && <AboutPage />}           {/* Giới thiệu kiến trúc RAG System */}
      </main>

      {/* Footer thông tin công nghệ ứng dụng */}
      <footer className="bg-dark text-white-50 py-4 mt-auto border-top">
        <div className="container text-center">
          <p className="mb-1 fw-semibold text-white">
            EduNext – Đề bài 2: Tra cứu Luật Lao động 2019 & Hợp đồng Nhân sự (RAG + LlamaIndex)
          </p>
          <small>
            Công nghệ: Python FastAPI • LlamaIndex • ChromaDB Vector Database • Gemini 3.6 Flash • ReactJS • Bootstrap 5
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
