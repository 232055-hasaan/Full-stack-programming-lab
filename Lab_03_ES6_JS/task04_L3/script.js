// ─────────────────────────────────────────────
// Lab Task 4 – Unique Course Registration (Set)
// ─────────────────────────────────────────────

// 1. Create a Set to store registered courses
const registeredCourses = new Set();

let totalAttempts = 0;
let totalDuplicates = 0;

// Preset courses for quick-add
const presets = [
  "Data Structures",
  "Algorithms",
  "Database Systems",
  "Web Engineering",
  "Operating Systems",
  "AI Fundamentals",
  "Computer Networks",
];

// ─── DOM References ───
const courseInput   = document.getElementById("courseInput");
const addBtn        = document.getElementById("addBtn");
const toast         = document.getElementById("toast");
const coursesGrid   = document.getElementById("coursesGrid");
const forOfPanel    = document.getElementById("forOfPanel");
const forOfOutput   = document.getElementById("forOfOutput");
const presetChips   = document.getElementById("presetChips");
const statUnique    = document.getElementById("statUnique");
const statAttempts  = document.getElementById("statAttempts");
const statDups      = document.getElementById("statDups");
const sizeBadge     = document.getElementById("sizeBadge");

// ─── Build Preset Chips ───
presets.forEach((name) => {
  const btn = document.createElement("button");
  btn.className = "chip";
  btn.textContent = name;
  btn.addEventListener("click", () => {
    courseInput.value = name;
    addCourse();
  });
  presetChips.appendChild(btn);
});

// ─── Show Toast ───
let toastTimer = null;
function showToast(message, type) {
  toast.textContent = message;
  toast.className = `toast ${type} visible`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3000);
}

// ─── Add Course ───
function addCourse() {
  const raw = courseInput.value.trim();
  if (!raw) {
    showToast("⚠  Please enter a course name.", "error");
    return;
  }

  totalAttempts++;

  // 2. Attempt adding (Set automatically ignores duplicates)
  if (registeredCourses.has(raw)) {
    totalDuplicates++;
    showToast(`✗  "${raw}" is already registered — duplicate blocked!`, "error");
  } else {
    registeredCourses.add(raw);     // Add to Set
    showToast(`✓  "${raw}" registered successfully!`, "success");
  }

  courseInput.value = "";
  render();
}

// ─── Remove Course ───
function removeCourse(name) {
  registeredCourses.delete(name);
  render();
}

// ─── Render Everything ───
function render() {
  // Update stats
  statUnique.textContent   = registeredCourses.size;   // .size usage
  statAttempts.textContent = totalAttempts;
  statDups.textContent     = totalDuplicates;
  sizeBadge.textContent    = `Set.size = ${registeredCourses.size}`;

  // Render course cards
  if (registeredCourses.size === 0) {
    coursesGrid.innerHTML = `<div class="empty-msg">No courses yet. Add one above.</div>`;
    forOfPanel.style.display = "none";
    return;
  }

  coursesGrid.innerHTML = "";
  let index = 1;

  // 3. Loop through Set using for...of
  for (const course of registeredCourses) {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <div class="card-info">
        <div class="card-index">#${String(index).padStart(2, "0")}</div>
        <div class="card-name" title="${course}">${course}</div>
      </div>
      <button class="remove-btn" title="Remove" data-course="${course}">×</button>
    `;
    coursesGrid.appendChild(card);
    index++;
  }

  // Bind remove buttons
  coursesGrid.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => removeCourse(btn.dataset.course));
  });

  // 4. Display for...of loop in code panel
  forOfPanel.style.display = "block";
  let codeLines = `<span class="kw">for</span> (<span class="kw">const</span> <span class="var">course</span> <span class="kw">of</span> <span class="var">registeredCourses</span>) {\n`;
  let i = 0;
  for (const course of registeredCourses) {
    codeLines += `  <span class="idx">[${i}]</span> → <span class="str">"${course}"</span>\n`;
    i++;
  }
  codeLines += `}\n<span class="kw">// Total unique courses:</span> <span class="str">${registeredCourses.size}</span>`;
  forOfOutput.innerHTML = codeLines;
}

// ─── Event Listeners ───
addBtn.addEventListener("click", addCourse);
courseInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addCourse();
});