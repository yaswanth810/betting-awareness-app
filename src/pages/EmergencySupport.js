import React, { useState } from 'react';
import './EmergencySupport.css'; // We'll style this next
import axios from 'axios';

const EmergencySupport = () => {
  const [situation, setSituation] = useState('');
  const [country, setCountry] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSupportRequest = async () => {
    if (!situation) return alert("Please describe your situation.");

    setLoading(true);
    setSupportMessage('');

    try {
      const res = await axios.post('http://localhost:8000/emergency-support', {
        situation_description: situation,
        country: country || null,
      });

      setSupportMessage(res.data.support);
    } catch (err) {
      setSupportMessage("⚠️ Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="emergency-support-container">
      <h2 className="neon-title">🆘 Emergency Scam Support</h2>
      <textarea
        placeholder="Describe what happened to you..."
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
      />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select your country (optional)</option>
        <option value="India">🇮🇳 India</option>
        <option value="USA">🇺🇸 USA</option>
        <option value="UK">🇬🇧 UK</option>
        <option value="Canada">🇨🇦 Canada</option>
        <option value="Australia">🇦🇺 Australia</option>
      </select>
      <button onClick={handleSupportRequest} className="submit-btn">Get Support</button>

      {loading && <p className="loading">🧠 Thinking...</p>}

      {supportMessage && (
        <div className="support-response neon-card">
          {supportMessage.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencySupport;
