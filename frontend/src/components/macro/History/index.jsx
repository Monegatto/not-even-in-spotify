import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import "./History.css"; // Importa o CSS externo

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook de navegação

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Usuário não autenticado.");
        return;
      }

      try {
        const response = await fetch("https://localhost:3000/api/track/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar histórico");
        }

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <header className="history-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)} // Volta para a página anterior
        >
          Voltar
        </button>
      </header>
      {error && <p className="history-error">{error}</p>}

      {history.length === 0 ? (
        <p className="history-empty">Nenhum histórico encontrado.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-info">
                <p className="track-name">{item.trackName}</p>
                <p className="artist-name">{item.artistName}</p>
              </div>
              <p className="search-time">{new Date(item.searchTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
