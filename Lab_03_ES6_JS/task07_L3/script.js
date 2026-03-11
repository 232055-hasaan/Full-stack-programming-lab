// ────────────────────────────────────────────────
// Lab Task 7 – Student Data Using JSON
// ────────────────────────────────────────────────

// ─────────────────────────────
// STEP 1: Create 3 Student Objects
// ─────────────────────────────
const students = [
  {
    id: "STU001",
    name: "Ayesha Khan",
    age: 20,
    semester: "4th",
    gpa: 3.8,
    courses: ["Data Structures", "Web Engineering", "Database Systems", "OOP"],
  },
  {
    id: "STU002",
    name: "Bilal Raza",
    age: 22,
    semester: "6th",
    gpa: 3.5,
    courses: ["Operating Systems", "Computer Networks", "AI Fundamentals", "Software Engineering"],
  },
  {
    id: "STU003",
    name: "Sara Malik",
    age: 21,
    semester: "5th",
    gpa: 3.9,
    courses: ["Algorithms", "Computer Architecture", "Numerical Methods", "Linear Algebra"],
  },
];

// ─────────────────────────────
// STEP 2: JSON.stringify()
// ─────────────────────────────
const jsonString = JSON.stringify(students, null, 2);
// console.log("JSON String:", jsonString);

// ─────────────────────────────
// STEP 3: JSON.parse()
// ─────────────────────────────
const parsedStudents = JSON.parse(jsonString);
// console.log("Parsed Students:", parsedStudents);

// ─── Config ───
const CARD_THEMES = [
  { banner: "#fde68a", bg: "#fffbeb", text: "#92400e", chipBg: "#fef3c7", chipColor: "#d97706", initBg: "#d97706" },
  { banner: "#a5f3fc", bg: "#f0fdfa", text: "#134e4a", chipBg: "#ccfbf1", chipColor: "#0d9488", initBg: "#0d9488" },
  { banner: "#fecdd3", bg: "#fff1f2", text: "#881337", chipBg: "#ffe4e6", chipColor: "#e11d48", initBg: "#e11d48" },
];

const DESTRUCT_COLORS = [
  { header: "#fff3cd", headerText: "#92400e", border: "rgba(217,119,6,0.2)", dot: "#d97706" },
  { header: "#d1fae5", headerText: "#064e3b", border: "rgba(13,148,136,0.2)", dot: "#0d9488" },
  { header: "#ffe4e6", headerText: "#881337", border: "rgba(225,29,72,0.2)",  dot: "#e11d48" },
];

// ─────────────────────────────
// STEP 4 + 5 + 6:
// Destructuring + innerHTML + forEach
// ─────────────────────────────

// ── Render Student Cards ──
const studentsGrid = document.getElementById("studentsGrid");

parsedStudents.forEach((student, index) => {
  // DESTRUCTURING: extract properties
  const { id, name, age, semester, gpa, courses } = student;

  const theme   = CARD_THEMES[index % CARD_THEMES.length];
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const courseChips = courses
    .map(c => `<span class="sc-course-chip" style="background:${theme.chipBg};color:${theme.chipColor}">${c}</span>`)
    .join("");

  // Display via innerHTML
  const card = document.createElement("div");
  card.className = "student-card";
  card.style.animationDelay = `${index * 0.12}s`;
  card.innerHTML = `
    <div class="sc-banner" style="background:${theme.banner}">
      <div class="sc-initials" style="background:${theme.initBg};color:#fff">${initials}</div>
    </div>
    <div class="sc-body">
      <div class="sc-name">${name}</div>
      <div class="sc-meta">
        ${id} &nbsp;·&nbsp; Age: ${age} &nbsp;·&nbsp; ${semester} Semester &nbsp;·&nbsp; GPA: ${gpa}
      </div>
      <div class="sc-courses-label">Courses (${courses.length})</div>
      <div class="sc-courses">${courseChips}</div>
    </div>
  `;
  studentsGrid.innerHTML += card.outerHTML;
});

// ── Render JSON Output ──
function syntaxHighlight(json) {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "json-number";
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? "json-key" : "json-string";
        } else if (/true|false/.test(match)) {
          cls = "json-bool";
        } else if (/null/.test(match)) {
          cls = "json-null";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

document.getElementById("jsonOutput").innerHTML = syntaxHighlight(jsonString);

// ── Render Destructuring Demo ──
const destructGrid = document.getElementById("destructGrid");

parsedStudents.forEach((student, index) => {
  // Destructuring with rename + rest
  const { id, name, age, semester, gpa, courses } = student;
  const theme = DESTRUCT_COLORS[index % DESTRUCT_COLORS.length];

  const card = document.createElement("div");
  card.className = "destruct-card";
  card.style.animationDelay = `${index * 0.12}s`;
  card.style.borderColor = theme.border;

  card.innerHTML = `
    <div class="destruct-header" style="background:${theme.header};color:${theme.headerText}">
      <span style="background:${theme.dot};width:10px;height:10px;border-radius:50%;display:inline-block"></span>
      const { id, name, age, … } = students[${index}]
    </div>
    <div class="destruct-body">
      <div class="destruct-row">
        <span class="destruct-key">id</span>
        <span class="destruct-val">${id}</span>
      </div>
      <div class="destruct-row">
        <span class="destruct-key">name</span>
        <span class="destruct-val">${name}</span>
      </div>
      <div class="destruct-row">
        <span class="destruct-key">age</span>
        <span class="destruct-val">${age}</span>
      </div>
      <div class="destruct-row">
        <span class="destruct-key">semester</span>
        <span class="destruct-val">${semester}</span>
      </div>
      <div class="destruct-row">
        <span class="destruct-key">gpa</span>
        <span class="destruct-val">${gpa}</span>
      </div>
      <div class="destruct-row">
        <span class="destruct-key">courses</span>
        <span class="destruct-val">[${courses.length} items]</span>
      </div>
    </div>
  `;
  destructGrid.appendChild(card);
});