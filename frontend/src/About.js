// src/About.js

import React from 'react';

function AboutPage({ onBackClick }) {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="gradient-text">About the SAP VM SKU Recommender</h1>
        <p>
          This application is an intelligent tool designed to simplify the process of selecting the optimal Azure Virtual Machine (VM) SKUs for various SAP workloads.
        </p>
        
        <h2>Core Technologies</h2>
        <ul>
          <li>
            <strong>Language Model (LLM):</strong> The core intelligence is powered by <strong>Qwen2-7B-Instruct</strong>, a 7-billion-parameter model fine-tuned specifically for SAP sizing tasks using the QLoRA technique.
          </li>
          <li>
            <strong>Retrieval-Augmented Generation (RAG):</strong> To ensure accuracy and provide up-to-date information, the model's knowledge is augmented in real-time with data primarily from **SAP Note 1928533**. This combination allows for both specialized logic and factual grounding.
          </li>
          <li>
            <strong>Backend:</strong> The server is built with Python using the <strong>FastAPI</strong> framework, running on a GPU for high-speed inference.
          </li>
          <li>
            <strong>Frontend:</strong> The user interface is a modern single-page application built with <strong>React.js</strong>.
          </li>
        </ul>

        <h2>How to Use</h2>
        <p>
          The recommender offers two modes of operation to suit your needs:
        </p>
        <ul>
            <li>
                <strong>Normal Mode:</strong> In this mode, the fine-tuned AI model uses its specialized training to answer your queries. It's best for general sizing questions and understanding architectural patterns.
            </li>
            <li>
                <strong>RAG Mode:</strong> This mode enhances the AI model with real-time data from our knowledge base. Use this for queries requiring specific, factual data like SAPS values or VM specifications for the most accurate results.
            </li>
        </ul>


        <h2>Purpose</h2>
        <p>
          The goal of this project is to provide accurate, fast, and reliable VM recommendations, reducing the complexity and research time typically associated with SAP infrastructure planning. By leveraging a specialized AI model, this tool aims to act as an expert assistant for cloud architects and SAP basis administrators.
        </p>
        <h2>Disclaimer</h2>
        <p>
          This is an AI-driven tool and is not infallible. While it aims for accuracy, all recommendations **must be cross-verified** with official SAP and Microsoft Azure documentation before being used in any production or critical environment. The developer assumes no liability for any inaccuracies.
        </p>
        
        <h2>About the Developer</h2>
        <p>
          This project was created by <b style={{ color: '#40f708ff' }}>Mr Meet JAiswal</b>. You can find more of my work on my <a href="https://github.com/MeetJAiswal2004" target="_blank" rel="noopener noreferrer" style={{ color: '#f7fb06ff' }}>portfolio</a>.
        </p>
        
        <button className="back-button" id="about-back-button" onClick={onBackClick}>
          &larr; Back to Recommender
        </button>
      </div>
    </div>
  );
}

export default AboutPage;