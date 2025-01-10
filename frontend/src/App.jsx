import React, { useState } from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import axios from "axios";
export default function App() {
  const [formData, setFormData] = useState({
    platform: "",
    tone: "",
    template: "",
    raw_content: "",
  });
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalContent("Loading...");
    setIsModalOpen(true);
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/", {
        params: formData
    });
    // console.log(response.data.response);
    setModalContent(response.data.response);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(modalContent);
    alert("Content copied to clipboard!");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <>
      <header className="header">
        <div className="brand">
          <svg className="logo" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="#646cff" />
            <path d="M15 15 L25 20 L15 25z" fill="white" />
          </svg>
          <h2>Post Generator AI</h2>
        </div>
      </header>

      <div className="container">
        <div className="split-layout">
          <div className="illustration">
            <svg viewBox="0 0 500 500">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#646cff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#8547c6", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <circle
                cx="250"
                cy="250"
                r="150"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="2"
              />
              <path
                d="M200,200 C200,150 300,150 300,200 S400,250 400,300"
                stroke="#646cff"
                fill="none"
              />
              <circle cx="250" cy="250" r="50" fill="#f0f0ff" />
              <path d="M230,270 L270,270 L250,230 Z" fill="#646cff" />
            </svg>
          </div>

          <div className="form-section">
            <div className="glass-form">
              <h1>Create Your Post ✨</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Platform</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose platform</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Twitter">Twitter</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tone</label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select tone</option>
                    <option value="Professional">Professional</option>
                    <option value="Casual">Casual</option>
                    <option value="Inspirational">Inspirational</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Template</label>
                  <select
                    name="template"
                    value={formData.template}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose template</option>
                    <option value="event_promotion">Event Promotion</option>
                    <option value="thought_leadership">
                      Thought Leadership
                    </option>
                    <option value="information_sharing">
                      Information Sharing
                    </option>
                    <option value="hiring">Hiring</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    name="raw_content"
                    value={formData.raw_content}
                    onChange={handleChange}
                    placeholder="Enter your content here..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="gradient-button">
                  Generate ✨
                </button>
              </form>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Generated Post</h2>
              <div className="markdown-preview">
                <ReactMarkdown>{modalContent}</ReactMarkdown>
              </div>
              {/* <textarea
                value={modalContent}
                onChange={(e) => setModalContent(e.target.value)}
              ></textarea> */}
              <div className="modal-buttons">
                <button
                  onClick={handleCopy}
                  className="gradient-button copy-button"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={closeModal}
                  className="gradient-button close-button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
