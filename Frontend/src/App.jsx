import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import IndexPage from './pages/IndexPage';
import ChunkingComparePanel from './components/ChunkingComparePanel';
import EmbeddingComparePanel from './components/EmbeddingComparePanel';
import AboutPage from './pages/AboutPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container pb-5 flex-grow-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'index' && <IndexPage />}
        {activeTab === 'chunking' && <ChunkingComparePanel />}
        {activeTab === 'embedding' && <EmbeddingComparePanel />}
        {activeTab === 'about' && <AboutPage />}
      </main>

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
