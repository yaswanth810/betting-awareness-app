import React, { useEffect, useRef, useState } from 'react';
import './CommunityChat.css';

const BASE_URL = 'ws://localhost:8000';

const CommunityChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('general');
  const [reactions, setReactions] = useState({});
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);
  const bottomRef = useRef(null);

  const connectWebSocket = (room) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) return;
    if (ws.current) ws.current.close();

    const socket = new WebSocket(`${BASE_URL}/ws/chat?room=${room}`);
    ws.current = socket;

    socket.onopen = () => {
      console.log(`✅ Connected to room: ${room}`);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.error('❌ Error parsing message:', err);
      }
    };

    socket.onclose = (e) => {
      console.warn(`⚠️ WebSocket disconnected from ${room}. Reason: ${e.reason}`);
      reconnectTimeout.current = setTimeout(() => connectWebSocket(room), 3000);
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
      socket.close();
    };
  };

  useEffect(() => {
    connectWebSocket(selectedRoom);
    return () => {
      if (ws.current) ws.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [selectedRoom]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const msg = inputMsg.trim();
    if (msg && ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
      setInputMsg('');
    } else {
      console.warn('⚠️ WebSocket is not connected or message is empty.');
    }
  };

  const handleReaction = (index, emoji) => {
    setReactions((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [emoji]: (prev[index]?.[emoji] || 0) + 1,
      },
    }));
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title neon-text">🛡️ Anonymous Community Chat</h2>

      <div className="chat-room-switch">
        <select
          value={selectedRoom}
          onChange={(e) => {
            setSelectedRoom(e.target.value);
            setMessages([]);
          }}
          className="chat-room-selector neon-select"
        >
          <option value="general">#general</option>
          <option value="scam-alerts">#scam-alerts</option>
          <option value="support">#support</option>
          <option value="experience-share">#experience-share</option>
        </select>
      </div>

      <div className="chat-box cyber-glow">
        {messages.map((msg, index) => (
          <div key={index} className="chat-bubble neon-bubble">
            <span className="chat-username">{msg.username}</span>
            <span className="chat-message">{msg.message}</span>
            <div className="emoji-reactions">
              {['👍', '❤️', '😢'].map((emoji) => (
                <span
                  key={emoji}
                  onClick={() => handleReaction(index, emoji)}
                  className="reaction-emoji"
                >
                  {emoji} {reactions[index]?.[emoji] || 0}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input neon-input"
          placeholder={`💬 Message #${selectedRoom}...`}
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="chat-send neon-button" onClick={sendMessage}>
          🚀 Send
        </button>
      </div>
    </div>
  );
};

export default CommunityChat;
