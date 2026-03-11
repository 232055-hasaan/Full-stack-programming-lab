import React from "react";

const courses = [
  {
    courseName: "React & Frontend Development",
    instructor: "Dr. Sarah Ahmed",
    duration: "8 Weeks",
    courseType: "Online",
  },
  {
    courseName: "Data Structures & Algorithms",
    instructor: "Prof. Usman Khan",
    duration: "12 Weeks",
    courseType: "Offline",
  },
  {
    courseName: "Machine Learning Fundamentals",
    instructor: "Dr. Zara Malik",
    duration: "10 Weeks",
    courseType: "Online",
  },
  {
    courseName: "Database Management Systems",
    instructor: "Prof. Hamid Raza",
    duration: "6 Weeks",
    courseType: "Offline",
  },
  {
    courseName: "Cyber Security Essentials",
    instructor: "Dr. Nadia Hussain",
    duration: "9 Weeks",
    courseType: "Online",
  },
];

function CourseItem({ courseName, instructor, duration, courseType }) {
  const isOnline = courseType === "Online";

  return (
    <div className="course-item">
      <div className="course-left">
        <div className="course-icon">{courseName.charAt(0)}</div>
      </div>
      <div className="course-info">
        <h3 className="course-name">{courseName}</h3>
        <p className="course-instructor">👤 {instructor}</p>
        <p className="course-duration">⏱ {duration}</p>
      </div>
      <div className={`course-badge ${isOnline ? "online" : "offline"}`}>
        <span className="badge-dot" />
        {courseType}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Mulish:wght@400;500;600&display=swap');

        .course-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #ffffff;
          border: 1px solid #eef0f4;
          border-radius: 16px;
          padding: 22px 26px;
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease both;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .course-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(99,102,241,0.12);
          border-color: #c7d2fe;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .course-left {
          flex-shrink: 0;
        }
        .course-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .course-info {
          flex: 1;
        }
        .course-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1e1b4b;
          margin: 0 0 6px;
        }
        .course-instructor,
        .course-duration {
          font-family: 'Mulish', sans-serif;
          font-size: 13px;
          color: #6b7280;
          margin: 2px 0;
        }
        .course-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 30px;
          font-family: 'Mulish', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }
        .course-badge.online {
          background: #d1fae5;
          color: #065f46;
        }
        .course-badge.offline {
          background: #fee2e2;
          color: #991b1b;
        }
        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Mulish:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f3ff; }
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          padding: 50px 20px;
          font-family: 'Mulish', sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .header-tag {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #6366f1;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .header h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 46px);
          font-weight: 700;
          color: #1e1b4b;
          line-height: 1.1;
        }
        .header p {
          margin-top: 10px;
          color: #6b7280;
          font-size: 14px;
        }
        .course-list {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
      `}</style>

      <div className="header">
        <p className="header-tag">React Lab Task 02</p>
        <h1>Course Catalog</h1>
        <p>{courses.length} courses available this semester</p>
      </div>

      <div className="course-list">
        {courses.map((course, index) => (
          <CourseItem key={index} {...course} />
        ))}
      </div>
    </div>
  );
}