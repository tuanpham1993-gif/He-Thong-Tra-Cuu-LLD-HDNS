import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Tra cứu & RAG (Task 2 & 4)', icon: 'bi-search' },
    { id: 'index', label: 'Dense Vector Index (Task 1)', icon: 'bi-database-fill-gear' },
    { id: 'chunking', label: 'So sánh Chunk Size (Task 3)', icon: 'bi-scissors' },
    { id: 'embedding', label: 'So sánh Embedding (Task 5)', icon: 'bi-cpu-fill' },
    { id: 'about', label: 'Giới thiệu RAG Stack', icon: 'bi-info-circle-fill' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar mb-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <i className="bi bi-shield-lock-fill text-warning fs-4"></i>
          <span>EduNext – Tra cứu Luật Lao động</span>
          <span className="brand-badge ms-2">RAG + LlamaIndex</span>
        </span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab.id}>
                <button
                  className={`nav-link btn text-start px-3 py-2 rounded-3 ${
                    activeTab === tab.id ? 'active bg-white text-primary fw-bold shadow-sm' : 'text-white'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`bi ${tab.icon} me-1.5`}></i>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
