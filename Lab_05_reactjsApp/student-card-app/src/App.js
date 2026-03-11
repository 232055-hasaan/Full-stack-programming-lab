import { useState } from "react";

const students = [
  {
    name: "Ayesha Raza",
    rollNo: "CS-2021-041",
    department: "Computer Science",
    university: "COMSATS University Islamabad",
    color: "#1a1a2e",
    accent: "#e94560",
  },
  {
    name: "Bilal Mahmood",
    rollNo: "EE-2022-017",
    department: "Electrical Engineering",
    university: "UET Lahore",
    color: "#0f3460",
    accent: "#16213e",
  },
  {
    name: "Sana Tariq",
    rollNo: "BBA-2023-088",
    department: "Business Administration",
    university: "LUMS Lahore",
    color: "#1b4332",
    accent: "#40916c",
  },
];

function StudentCard({ name, rollNo, department, university, color, accent }) {
  const [flipped, setFlipped] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      className="card-wrapper"
      onClick={() => setFlipped(!flipped)}
      style={{ cursor: "pointer" }}
    >
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        {/* FRONT */}
        <div className="card-face card-front" style={{ background: color }}>
          <div
            className="card-pattern"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${accent}55 0%, transparent 60%)`,
            }}
          />
          <div className="card-top-bar" style={{ background: accent }} />

          <div className="avatar" style={{ borderColor: accent }}>
            {initials}
          </div>

          <div className="card-body">
            <h2 className="student-name">{name}</h2>
            <div className="roll-badge" style={{ background: accent }}>
              {rollNo}
            </div>
          </div>

          <div className="card-footer">
            <span className="flip-hint">tap to flip ↻</span>
          </div>
        </div>

        {/* BACK */}
        <div className="card-face card-back" style={{ background: color }}>
          <div
            className="card-pattern"
            style={{
              background: `radial-gradient(circle at 20% 80%, ${accent}55 0%, transparent 60%)`,
            }}
          />
          <div className="back-content">
            <div className="info-block">
              <span className="info-label">Department</span>
              <span className="info-value">{department}</span>
            </div>
            <div className="divider" style={{ background: accent }} />
            <div className="info-block">
              <span className="info-label">University</span>
              <span className="info-value">{university}</span>
            </div>
            <div className="divider" style={{ background: accent }} />
            <div className="info-block">
              <span className="info-label">Roll Number</span>
              <span className="info-value">{rollNo}</span>
            </div>
          </div>
          <div className="card-footer">
            <span className="flip-hint">tap to flip ↻</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .card-wrapper {
          width: 300px;
          height: 380px;
          perspective: 1000px;
          flex-shrink: 0;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          backface-visibility: hidden;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 24px 20px;
          box-sizing: border-box;
        }
        .card-back {
          transform: rotateY(180deg);
        }
        .card-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .card-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 5px;
          border-radius: 20px 20px 0 0;
        }
        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 3px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: white;
          background: rgba(255,255,255,0.1);
          margin-top: 20px;
          letter-spacing: 2px;
          backdrop-filter: blur(10px);
          z-index: 1;
        }
        .card-body {
          margin-top: 20px;
          text-align: center;
          z-index: 1;
        }
        .student-name {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0 0 14px;
          letter-spacing: 0.5px;
        }
        .roll-badge {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: white;
          padding: 6px 14px;
          border-radius: 30px;
          letter-spacing: 1px;
          opacity: 0.95;
        }
        .card-footer {
          margin-top: auto;
          z-index: 1;
        }
        .flip-hint {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }
        .back-content {
          width: 100%;
          margin-top: 24px;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }
        .info-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 0;
        }
        .info-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .info-value {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: white;
          line-height: 1.3;
        }
        .divider {
          height: 1px;
          opacity: 0.3;
          border-radius: 1px;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'Syne', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "52px" }}>
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "4px",
          color: "#555",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}>
          React Lab Task 01
        </p>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: "800",
          color: "white",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}>
          Student Cards
        </h1>
        <p style={{
          marginTop: "12px",
          color: "#666",
          fontSize: "14px",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.5px",
        }}>
          Click a card to reveal more info
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: "28px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {students.map((student, i) => (
          <StudentCard key={i} {...student} />
        ))}
      </div>
    </div>
  );
}