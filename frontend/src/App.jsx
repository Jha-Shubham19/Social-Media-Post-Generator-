import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [formData, setFormData] = useState({
        platform: '',
        tone: '',
        template: '',
        raw_content: ''
    });
    const [modalContent, setModalContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          console.log(formData);
          const response = await axios.get("http://127.0.0.1:8000/", {
              params: formData
          });
          console.log(response.data.response.choices[0].message.content);
          setModalContent(response.data.response.choices[0].message.content);
          setIsModalOpen(true);
      } catch (error) {
          console.error("Error submitting form:", error);
          alert("Failed to submit the form. Please try again.");
      }
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
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h1>Post Generator 🚀</h1>
            <form onSubmit={handleSubmit}>
                {/* Platform Dropdown */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="platform">Platform:</label>
                    <select
                        id="platform"
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a platform</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Twitter">Twitter</option>
                    </select>
                </div>

                {/* Tone Dropdown */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="tone">Tone:</label>
                    <select
                        id="tone"
                        name="tone"
                        value={formData.tone}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a tone</option>
                        <option value="Professional">Professional</option>
                        <option value="Casual">Casual</option>
                        <option value="Inspirational">Inspirational</option>
                    </select>
                </div>

                {/* Template Dropdown */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="template">Template:</label>
                    <select
                        id="template"
                        name="template"
                        value={formData.template}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a template</option>
                        <option value="event_promotion">Event Promotion</option>
                        <option value="thought_leadership">Thought Leadership</option>
                        <option value="information_sharing">Information Sharing</option>
                        <option value="hiring">Hiring</option>
                    </select>
                </div>

                {/* Raw Content Field */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="raw_content">Raw Content:</label>
                    <textarea
                        id="raw_content"
                        name="raw_content"
                        value={formData.raw_content}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter 1 to 2 lines of information..."
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>

             {/* Modal */}
             {isModalOpen && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        maxWidth: "500px",
                        width: "100%",
                        textAlign: "center",
                    }}>
                        <h2 style={{color:"#000"}}>Response</h2>
                        <textarea
                            value={modalContent}
                            style={{
                                width: "100%",
                                height: "350px",
                                marginBottom: "10px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "1rem",
                            }}
                            onChange={(e) => setModalContent(e.target.value)}
                        ></textarea>
                        <button onClick={handleCopy} style={{ marginRight: "10px" }}>Copy</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
