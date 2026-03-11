// ──────────────────────────────────────────────────────
// Lab Task 6 – Mini University Portal
// Combines: Class · Map · Set · Promise
// ──────────────────────────────────────────────────────

// ─────────────────────────────
// 1. CLASS DEFINITION
// ─────────────────────────────
class Student {
  constructor(id, name, age, semester, courses = []) {
    this.id        = id;
    this.name      = name;
    this.age       = age;
    this.semester  = semester;
    this.courses   = new Set(courses);   // Set for unique courses
    this.createdAt = new Date().toLocaleTimeString();
  }

  registerCourse(course) {
    const sizeBefore = this.courses.size;
    this.courses.add(course);
    return this.courses.size > sizeBefore; // true = newly added
  }

  getCourseList() {
    return [...this.courses]; // spread Set → Array
  }

  toString() {
    return `Student[${this.id}] ${this.name} | Sem: ${this.semester} | Courses: ${this.courses.size}`;
  }
}

// ─────────────────────────────
// 2. MAP: Student Storage
// ─────────────────────────────
const studentMap = new Map();       // Key = studentId, Value = Student instance

// ─────────────────────────────
// 3. SET: Temp courses for form
// ─────────────────────────────
const tempCourseSet = new Set();    // Holds courses for the student being added

// ─── State ───
let savedCount = 0;
const AVATAR_COLORS = ["#3b82f6","#818cf8","#34d399","#fb923c","#f472b6","#22d3ee","#a78bfa","#fbbf24"];

// ─── DOM ───
const sIdInput        = document.getElementById("sId");
const sNameInput      = document.getElementById("sName");
const sAgeInput       = document.getElementById("sAge");
const sSemInput       = document.getElementById("sSem");
const courseField     = document.getElementById("courseField");
const addCourseBtn    = document.getElementById("addCourseBtn");
const coursesChips    = document.getElementById("coursesChips");
const saveStudentBtn  = document.getElementById("saveStudentBtn");
const saveLabel       = document.getElementById("saveLabel");
const saveToast       = document.getElementById("saveToast");
const promiseLog      = document.getElementById("promiseLog");
const studentList     = document.getElementById("studentList");
const clearBtn        = document.getElementById("clearBtn");

const hStatStudents = document.getElementById("hStatStudents");
const hStatCourses  = document.getElementById("hStatCourses");
const hStatSaved    = document.getElementById("hStatSaved");

// ─────────────────────────────
// 4. PROMISE: Simulate saving
// ─────────────────────────────
function simulateSave(student) {
  return new Promise((resolve, reject) => {
    addLog(`Saving ${student.name}…`, "saving");
    setTimeout(() => {
      if (Math.random() > 0.05) {
        resolve({ ok: true, student });
      } else {
        reject(new Error(`Server timeout for ${student.id}`));
      }
    }, 1000);
  });
}

// ─── Promise Log ───
function addLog(message, type = "info") {
  const colorMap = {
    saving: "var(--yellow)",
    ok:     "var(--green)",
    err:    "var(--red)",
    info:   "var(--blue)",
  };

  if (promiseLog.querySelector(".log-empty")) {
    promiseLog.innerHTML = "";
  }

  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerHTML = `
    <div class="log-dot" style="background:${colorMap[type] || colorMap.info}"></div>
    <span class="log-time">${new Date().toLocaleTimeString()}</span>
    <span>${message}</span>
  `;
  promiseLog.prepend(entry);

  // Keep at most 10 entries
  while (promiseLog.children.length > 10) promiseLog.removeChild(promiseLog.lastChild);
}

// ─── Toast ───
let toastTimer;
function showSaveToast(msg, type) {
  saveToast.textContent = msg;
  saveToast.className = `form-toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => saveToast.classList.remove("show"), 3500);
}

// ─────────────────────────────
// COURSE SET MANAGEMENT (form)
// ─────────────────────────────
function addCourseToForm() {
  const val = courseField.value.trim();
  if (!val) return;

  if (tempCourseSet.has(val)) {
    showSaveToast(`⚠  "${val}" already in Set — duplicate blocked!`, "err");
    courseField.value = "";
    return;
  }

  tempCourseSet.add(val);   // Add to Set
  courseField.value = "";
  renderCourseChips();
}

function removeCourseFromForm(name) {
  tempCourseSet.delete(name);
  renderCourseChips();
}

function renderCourseChips() {
  coursesChips.innerHTML = "";
  if (tempCourseSet.size === 0) {
    coursesChips.innerHTML = `<span class="no-courses">No courses added yet</span>`;
    return;
  }
  for (const course of tempCourseSet) {   // for...of Set
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerHTML = `${course} <button class="chip-remove" data-course="${course}" title="Remove">×</button>`;
    coursesChips.appendChild(chip);
  }
  coursesChips.querySelectorAll(".chip-remove").forEach(btn => {
    btn.addEventListener("click", () => removeCourseFromForm(btn.dataset.course));
  });
}

// ─────────────────────────────
// SAVE STUDENT (uses Promise)
// ─────────────────────────────
async function saveStudent() {
  const id       = sIdInput.value.trim().toUpperCase();
  const name     = sNameInput.value.trim();
  const age      = parseInt(sAgeInput.value);
  const semester = sSemInput.value;

  if (!id || !name || isNaN(age)) {
    showSaveToast("⚠  Please fill in ID, Name, and Age.", "err");
    return;
  }
  if (studentMap.has(id)) {
    showSaveToast(`✗  Student ID "${id}" already exists in Map.`, "err");
    return;
  }

  // Create Student via Class
  const student = new Student(id, name, age, semester, [...tempCourseSet]);

  // Disable button during save
  saveStudentBtn.disabled = true;
  saveLabel.textContent = "Saving…";
  showSaveToast("⏳ Connecting to server…", "saving");

  try {
    const result = await simulateSave(student);     // Await Promise

    // Store in Map
    studentMap.set(id, result.student);             // Map.set()
    savedCount++;

    addLog(`✓ Saved: ${student.toString()}`, "ok");
    showSaveToast(`✓  ${name} saved successfully!`, "ok");

    // Reset form
    sIdInput.value = sNameInput.value = sAgeInput.value = "";
    tempCourseSet.clear();
    renderCourseChips();
    updateStats();
    renderStudents();

  } catch (err) {
    addLog(`✗ Failed: ${err.message}`, "err");
    showSaveToast(`✗  Save failed: ${err.message}`, "err");
  } finally {
    saveStudentBtn.disabled = false;
    saveLabel.textContent = "Save via Promise →";
  }
}

// ─────────────────────────────
// RENDER STUDENTS (Map)
// ─────────────────────────────
function renderStudents() {
  studentList.innerHTML = "";

  if (studentMap.size === 0) {
    studentList.innerHTML = `
      <div class="registry-empty">
        <div class="empty-icon">🎓</div>
        <p>No students yet.<br />Add one using the form.</p>
      </div>`;
    return;
  }

  let i = 0;
  // Iterate through Map
  studentMap.forEach((student, id) => {
    const card = document.createElement("div");
    card.className = "student-card";
    card.style.animationDelay = `${i * 0.07}s`;

    const initials = student.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const color = AVATAR_COLORS[i % AVATAR_COLORS.length];

    const courseChips = student.getCourseList().length > 0
      ? student.getCourseList().map(c => `<span class="sc-course">${c}</span>`).join("")
      : `<span class="sc-no-courses">No courses registered</span>`;

    card.innerHTML = `
      <div class="sc-top">
        <div class="sc-avatar" style="background:${color}22; color:${color}; border:2px solid ${color}40">${initials}</div>
        <div style="flex:1">
          <div class="sc-name">${student.name}</div>
          <div class="sc-meta">ID: ${student.id} &nbsp;·&nbsp; Age: ${student.age} &nbsp;·&nbsp; ${student.semester} Semester</div>
        </div>
        <div class="sc-status">✓ Saved</div>
      </div>
      <div class="sc-courses">${courseChips}</div>
    `;

    studentList.appendChild(card);
    i++;
  });
}

// ─────────────────────────────
// UPDATE HEADER STATS
// ─────────────────────────────
function updateStats() {
  hStatStudents.textContent = studentMap.size;      // Map.size
  hStatSaved.textContent    = savedCount;

  // Count all unique courses across all students using a Set
  const allCourses = new Set();
  studentMap.forEach(student => {
    for (const course of student.courses) {
      allCourses.add(course);
    }
  });
  hStatCourses.textContent = allCourses.size;       // Set.size
}

// ─────────────────────────────
// CLEAR ALL
// ─────────────────────────────
function clearAll() {
  if (studentMap.size === 0) return;
  if (!confirm("Clear all students from the registry?")) return;
  studentMap.clear();
  addLog("🗑 Registry cleared.", "info");
  updateStats();
  renderStudents();
}

// ─── Event Listeners ───
addCourseBtn.addEventListener("click", addCourseToForm);
courseField.addEventListener("keydown", e => { if (e.key === "Enter") addCourseToForm(); });
saveStudentBtn.addEventListener("click", saveStudent);
clearBtn.addEventListener("click", clearAll);