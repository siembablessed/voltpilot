// src/components/NLPChat.jsx
import { useState } from 'react';
import './nlpchat.css';

const dummyResponses = {
  population: "This area has a population of around 480,000 with 12% EV adoption.",
  evs: "DMV records indicate roughly 7,200 EVs registered in this area.",
  forecast: "Data suggests AC Level Two is ideal for this region.",
  challenges: "Agents reported infrastructure and zoning delays in this quarter.",
  insights: "Sites graded 'A' had 30% more successful setups. Focus on malls and municipal lots.",
};

const presetQuestions = {
  population: "What is the population count in this area?",
  evs: "How many EVs are registered here (DMV records)?",
  forecast: "What charging level is suitable for this site?",
  challenges: "What challenges did agents face this quarter?",
  insights: "Give me insights based on dashboard data."
};

export default function NLPChat() {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hi 👋 I’m NLP – your insights assistant. Ask anything or select below.' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (text, key = null) => {
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setTimeout(() => {
      const reply = key && dummyResponses[key]
        ? dummyResponses[key]
        : "Let me analyze the data... (Feature coming soon)";
      setMessages((prev) => [...prev, { from: 'ai', text: reply }]);
    }, 700);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const clearChat = () => {
    setMessages([
      { from: 'ai', text: 'Hi 👋 I’m NLP – your insights assistant. Ask anything or select below.' }
    ]);
  };

  return (
    <>
      <button className="nlp-toggle" onClick={() => setShow(!show)}>
        💬 Ask NLP
      </button>

      {show && (
        <div className="nlp-popup">
          <div className="nlp-header">
            <strong>NLP – AI Site Assistant</strong>
            <button onClick={clearChat} title="Clear">🗑️</button>
            <button onClick={() => setShow(false)} title="Close">✖</button>
          </div>

          <div className="nlp-body">
            {messages.map((msg, i) => (
              <div key={i} className={`nlp-msg ${msg.from}`}>{msg.text}</div>
            ))}
          </div>

          <div className="nlp-search">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Ask NLP something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>

          <div className="nlp-questions">
            {Object.entries(presetQuestions).map(([key, text]) => (
              <button key={key} onClick={() => sendMessage(text, key)}>{text}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
