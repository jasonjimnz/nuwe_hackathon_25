import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje"
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;
