import React from "react";

const greetings = [
  { name: "Ayesha", timeOfDay: "morning", bgColor: "#fff7ed" },
  { name: "Bilal",  timeOfDay: "afternoon", bgColor: "#f0fdf4" },
  { name: "Sana",   timeOfDay: "evening", bgColor: "#fdf4ff" },
  { name: "Omar",   timeOfDay: "night", bgColor: "#0f172a" },
];

function Greeting({ name, timeOfDay, bgColor }) {
  const config = {
    morning:   { emoji: "🌅", message: "Good Morning", sub: "Rise and shine! Have a productive day.", accent: "#f97316", text: "#7c2d12" },
    afternoon: { emoji: "☀️",  message: "Good Afternoon", sub: "Hope your day is going great!", accent: "#16a34a", text: "#14532d" },
    evening:   { emoji: "🌆", message: "Good Evening", sub: "Time to unwind and relax.", accent: "#9333ea", text: "#581c87" },
    night:     { emoji: "🌙", message: "Good Night", sub: "Rest well and dream big.", accent: "#6366f1", text: "#e0e7ff" },
  };

  const { emoji, message, sub, accent, text } = config[timeOfDay] || config.morning;
  const isDark = timeOfDay === "night";

  return (
    <div className="greeting-card" style={{ background: bgColor }}>
      <div className="greeting-emoji">{emoji}</div>
      <div className="greeting-content">
        <h2 className="greeting-title" style={{ color: isDark ? "#e0e7ff" : text }}>
          {message}, {name}!
        </h2>
        <p className="greeting-sub" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>
          {sub}
        </p>
        <span className="greeting-tag" style={{ background: accent + "22", color: accent }}>
          {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
        </span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;900&family=Nunito:wght@400;500;600&display=swap');

        .greeting-card {
          display: flex;
          align-items: center;
          gap: 24px;
          border-radius: 20px;
          padding: 28px 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeUp 0.6s ease both;
        }
        .greeting-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .greeting-emoji {
          font-size: 52px;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
        }
        .greeting-content {
          flex: 1;
        }
        .greeting-title {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .greeting-sub {
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          margin: 0 0 12px;
          line-height: 1.5;
        }
        .greeting-tag {
          display: inline-block;
          font-family: 'Nunito', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;900&family=Nunito:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f8fafc; }
        .app {
          min-height: 100vh;
          background: linear-gradient(160deg, #f8fafc, #e2e8f0);
          padding: 50px 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .header-tag {
          font-family: 'Nunito', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #6366f1;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .header h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          color: #0f172a;
        }
        .header p {
          margin-top: 10px;
          font-family: 'Nunito', sans-serif;
          color: #64748b;
          font-size: 14px;
        }
        .greeting-list {
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      `}</style>

      <div className="header">
        <p className="header-tag">React Lab Task 03</p>
        <h1>Daily Greetings</h1>
        <p>Conditional rendering based on time of day</p>
      </div>

      <div className="greeting-list">
        {greetings.map((g, i) => (
          <Greeting key={i} {...g} />
        ))}
      </div>
    </div>
  );
}