
const students = [
  { name: "lakshman", roll: "1" },
  { name: "dilip", roll: "2" },
  { name: "subbu", roll: "3" }
];

const PASSWORD = "teacher123"; // Simple hardcoded login

function login() {
  const inputPass = document.getElementById("password").value;
  if (inputPass === PASSWORD) {
    document.getElementById("attendanceForm").classList.remove("hidden");
    renderStudents();
  } else {
    alert("Invalid password!");
  }
}

function renderStudents() {
  const container = document.getElementById("studentsList");
  container.innerHTML = "";
  students.forEach(student => {
    container.innerHTML += `
      <div class="flex justify-between items-center mb-2">
        <span>${student.name} (${student.roll})</span>
        <select id="status-${student.roll}" class="border p-1">
          <option value="P">P</option>
          <option value="A">A</option>
        </select>
      </div>
    `;
  });
}

function submitAttendance() {
  const dateInput = document.querySelector("input[type='date']");
  const date = dateInput ? dateInput.value : new Date().toLocaleDateString('en-GB').replaceAll('/', '-');
  const attendance = students.map(s => {
    const status = document.getElementById(`status-${s.roll}`).value;
    return { roll: s.roll, status };
  });

  fetch("https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec", {
    method: "POST",
    body: JSON.stringify({ date, attendance }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(msg => {
      alert("✅ Attendance submitted successfully!");
    })
    .catch(err => {
      alert("❌ Error submitting attendance.");
      console.error(err);
    });
}
