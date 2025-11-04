# SAP VM SKU Recommender ☁️ (GPU Accelerated)

<p align="center">
  <b>An intelligent recommendation engine that simplifies the process of selecting optimal Azure Virtual Machine (VM) SKUs for SAP workloads. This application leverages a fine-tuned Large Language Model (Qwen2-7B) combined with Retrieval-Augmented Generation (RAG) to provide accurate, context-aware, and data-driven recommendations.
  </b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch">
  <img src="https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face">
  <img src="https://img.shields.io/badge/LangChain-🦜🔗-blue?style=for-the-badge" alt="LangChain">
  <img src="https://img.shields.io/badge/RAG-brightgreen?style=for-the-badge" alt="RAG">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Google_Colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white" alt="Google Colab">
</p>

---


<p align="center">
  <b>• This utility leverages a GEN AI-based RAG model built with LangChain to simplify and accelerate SKU recommendations tailored to diverse SAP workloads, a task that can often be challenging for sales and presales teams.
  </b>
</p>

## 🚀 Application Showcase

<p align="center">
  <img src="assets/main_page_screenshot.png" alt="Main Recommender Interface" width="48%"/>
  <img src="assets/rag_response_screenshot.png" alt="RAG Mode Response" width="48%"/>
</p>
<!-- <p align="center">
  <img src="assets/demo.gif" alt="Project Demo GIF" width="80%">
</p> -->
<p align="center">
  <img src="assets/login_page_screenshot.png" alt="Login Page" width="30%"/>
  <img src="assets/agreement_page_screenshot.png" alt="User Agreement Page" width="30%"/>
  <img src="assets/about_us_screenshot.png" alt="About Us Page" width="30%"/>
</p>
<p align="center">
  <img src="assets/mobile_view_1.png" alt="Responsive Mobile View" width="30%"/>
  <img src="assets/mobile_view_2.png" alt="Responsive Mobile View 2" width="30%"/>
</p>

---

## 📋 Table of Contents
- [About The Project](#about-the-project)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [AI Model Workflow (RAG)](#-ai-model-workflow-rag)
- [Tech Stack](#-tech-stack)
- [Local Development Setup](#-local-development-setup)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)

## About The Project

The SAP VM SKU Recommender is a sophisticated tool designed for cloud architects and SAP basis administrators to streamline infrastructure planning. It replaces manual research and complex decision-making with fast, AI-driven recommendations for Azure VMs tailored to specific SAP workloads.

The project is built on a high-performance, **decoupled microservice architecture**. The frontend (React), user authentication (FastAPI + MongoDB), and the core AI engine (FastAPI + PyTorch + GPU) operate as independent services. The AI engine is designed to run in a **GPU-accelerated environment** (like Google Colab), enabling rapid inference.

The core of the recommender lies in its hybrid AI approach, combining a **fine-tuned Language Model (Qwen2-7B)** with **Retrieval-Augmented Generation (RAG)**. This ensures that recommendations are not only intelligent and context-aware (thanks to fine-tuning) but also factually grounded in official documentation (thanks to RAG).

## ✨ Key Features

- **Fine-Tuned LLM**: Utilizes **Qwen2-7B-Instruct**, a 7-billion-parameter model specifically fine-tuned with **QLoRA** for SAP on Azure sizing tasks.
- **Retrieval-Augmented Generation (RAG)**: Enhances accuracy by pulling real-time context from a vector database of official documentation (SAP Note 1928533), minimizing hallucinations.
- **Dual Inference Modes**: Offers a "Normal Mode" (for general, pattern-based advice) and a "RAG Mode" (for high-fidelity, fact-based recommendations).
- **GPU-Accelerated Backend**: Leverages **Google Colab's T4 GPU** for high-speed inference, delivering complex recommendations in seconds.
- **Microservice Architecture**: Decoupled backend with independent servers for **Authentication** and the **AI Engine**, ensuring scalability and resilience.
- **Secure User Authentication**: Robust Signup/Login system with password hashing (`bcrypt`) and a dedicated **MongoDB Atlas** database for user management.
- **Persistent Login Sessions**: Users remain logged in across page reloads until they explicitly log out, thanks to session management with `localStorage`.
- **Professional Onboarding Flow**: A seamless onboarding process featuring a one-time User Agreement & Disclaimer acceptance for new users after their first login.
- **Fully Responsive UI**: A modern and clean user interface built with **React**, providing a consistent and intuitive experience on both desktop and mobile devices.

## 🏛️ System Architecture

The application uses a distributed microservice model, ensuring that each component can be scaled and maintained independently.


                             +-----------------------------------------+
                             |                                         |
                             |             React Frontend              |
                             |       (Can be hosted on Render.com)     |
                             |                                         |
                             +-------------------+---------------------+
                                                 |
                                  (HTTPS API Calls via Internet)
                                                 |
                                   +-------------+-------------+
                                   |                           |
                                   v                           v
                     +-------------------------+   +---------------------------+
                     |                         |   |                           |
                     | Server 1: Auth Service  |   | Server 2: AI Engine       |
                     |  (FastAPI + MongoDB)    |   | (FastAPI + PyTorch + GPU) |
                     |                         |   |                           |
                     | Hosted on: Google Colab |   | Hosted on: Google Colab   |
                     |  Exposed via: Ngrok     |   |  Exposed via: Ngrok       |
                     |                         |   |                           |
                     +-------------------------+   +---------------------------+




## 🧠 AI Model Workflow (RAG)

When a query is made in RAG mode, the following workflow is executed to generate a factually grounded response:

<p align="center">
    <img src="assets/Ai-agent-workflow.png" alt="Ai-agent-workflow" width="100%">
</p>

                          
                                 +----------------------------------+
                                 |           [User Query]           |
                                 +----------------------------------+
                                                |
                                                v
                                 +----------------------------------+
                                 |  [FastAPI Backend - /infer_rag]  |
                                 +----------------------------------+
                                                |
                                                v
                                 +----------------------------------+
                                 |      [langchain_infer.py]        |
                                 |   (Performs Similarity Search)   |
                                 +----------------------------------+
                                                |
                                                v
                                 +----------------------------------+       +-------------------------+
                                 |       FAISS Vector Store         | <---- |      SAPSizing.txt      |
                                 |     (Finds relevant chunks)      |       |    (Source Document)    |
                                 +----------------------------------+       +-------------------------+
                                                |
                                                v
                             +------------------------------------------+
                             | [Context Chunks] + [Original User Query] |
                             +------------------------------------------+
                                                |
                                                v
                             +------------------------------------------+
                             |       [Formatted Prompt Template]        |
                             |"Context: {context}\nQuestion: {question}"|
                             +------------------------------------------+
                                                |
                                                v
                             +------------------------------------------+
                             |   [Fine-Tuned Qwen2-7B Model on GPU]     |
                             | (Generates response using both its       |
                             | training and the provided context)       |
                             +------------------------------------------+
                                                 |
                                                 v
                             +------------------------------------------+
                             |        [Final Response to User]          |
                             +------------------------------------------+




## 🛠️ Tech Stack
-----------------------------------------------------------------------------------------------
| Category           | Technology / Library                                                   |
| ----------------   | -----------------------------------------------------------------------|
| **Frontend**       | `React.js`, `Axios`, `CSS3`                                            |
| **Backend**        | `Python 3`, `FastAPI`, `Uvicorn`, `Pyngrok`                            |
| **AI / ML**        | `PyTorch`, `Transformers`, `LangChain`, `PEFT (QLoRA)`, `bitsandbytes` |
| **Database**       | `MongoDB Atlas`, `PyMongo`                                             |
| **Authentication** | `Passlib`, `Bcrypt`                                                    |
| **Hosting**        | `Google Colab` (Backend), `Ngrok` (Tunneling)                          |
-----------------------------------------------------------------------------------------------
---

## 🚀 Local Development Setup

To run this project, you need to set up and run the two backend servers and the frontend client separately.

### Prerequisites
- Python 3.9+
- Node.js v18+ and `npm`
- A MongoDB Atlas account and connection string.
- An Ngrok account and Auth Token.

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/your-username/SAP_VM_SKU_Recommender.git
    cd SAP_VM_SKU_Recommender
    ```

2.  **Setup Backend Server 1 (Authentication)**
    - Navigate to the `SAP_VM_Project/server1` directory.
    - Install dependencies: `pip install -r requirements.txt`
    - Create a `.env` file and add your MongoDB secret key:
      ```env
      # SAP_VM_Project/server1/.env
      MONGO_URI="YOUR_MONGO_CONNECTION_STRING"
      ```
    - Run the server from Google Colab or locally: `python auth_server.py`

3.  **Setup Backend Server 2 (AI Engine)**
    - Navigate to the `SAP_VM_Project/server2/backend` directory.
    - Install dependencies: `pip install -r requirements.txt`
    - Create a `.env` file and add your Ngrok secrets:
      ```env
      # SAP_VM_Project/server2/backend/.env
      NGROK_AUTHTOKEN="YOUR_NGROK_AUTH_TOKEN"
      NGROK_DOMAIN="your-ngrok-domain.ngrok-free.app"
      ```
    - Run the server (must be on a GPU environment like Colab): `python qwen_server.py`

4.  **Setup Frontend**
    - Navigate to the `frontend` directory.
    - Install dependencies: `npm install`
    - Create a `.env` file in the `frontend` folder and paste the public Ngrok URLs from your running backend servers.
      ```env
      # frontend/.env
      REACT_APP_AUTH_SERVER_URL="https://your-auth-server-url.ngrok-free.app"
      REACT_APP_MAIN_ENGINE_URL="https://your-ai-engine-url.ngrok-free.app"
      ```

5.  **Run the Frontend**
    ```sh
    npm start
    ```
    - The application will be available at `http://localhost:3000`.

---

## 🌐 Deployment

- The **Frontend** is built as a static site and can be deployed on platforms like **Render.com**, Vercel, or Netlify.
- The **Backend Servers** are currently configured to run on **Google Colab** to leverage its free T4 GPU resources. **Ngrok** is used to create secure public tunnels to the Colab instances, making them accessible to the deployed frontend.

---

## 📂 Project Structure

                             
      📁 SAP_VM_SKU_Recommender/
       │
       ├── 📄 .gitignore
       │
       ├── 📁 frontend/
       │   │
       │   ├── 📄 .env
       │   ├── 📄 package.json
       │   ├── 📁 node_modules/
       │   ├── 📁 public/
       │   │   ├── 📄 index.html
       │   │   └── 🖼️ favicon.ico
       │   └── 📁 src/
       │       ├── 📄 App.js
       │       ├── 📄 index.js
       │       ├── 📄 LoginPage.js
       │       ├── 📄 SignupPage.js
       │       ├── 📄 AgreementPage.js
       │       ├── 📄 AuthAlert.js
       │       ├── 📄 About.js
       │       ├── 📄 App.css
       │       ├── 📄 Alertbox.css
       │       └── 📄 AuthForm.css
       │
       └── 📁 SAP_VM_Project/         # run on colab Gpu
           │
           ├── 📁 server1/
           │   │
           │   ├── 📄 .env
           │   ├── 📄 auth_server.py
           │   └── 📄 requirements.txt
           │
           └── 📁 server2/
               │
               └── 📁 backend/
                   │
                   ├── 📄 .env
                   ├── 📄 qwen_server.py
                   ├── 📄 langchain_infer.py
                   ├── 📄 requirements.txt
                   ├── 📄 train_qwen.py
                   ├── 📄 rag_utils.py
                   ├── 📄 training_config.yaml
                   │
                   ├── 📁 data/
                   ├── 📁 vectorstore/
                   ├── 📁 base_model/
                   └── 📁 qwen_finetuned/
                     
                                   
       
       
       
       
       
       
