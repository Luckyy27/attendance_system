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
      <div class="flex justify-between items-center">
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
  const date = new Date().toLocaleDateString('en-GB').replaceAll('/', '-');
  const attendance = students.map(s => {
    const status = document.getElementById(`status-${s.roll}`).value;
    return { roll: s.roll, status };
  });

  fetch("https://script.google.com/macros/s/AKfycbz2_0yKaSZ4WTO9CfddYaoXV_X4Vr1s7mKSDXQxbGyM51I4S6IUn6fhp4vM6QlimHiP/exec", {
    method: "POST",
    body: JSON.stringify({ date, attendance }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(msg => {
      alert("Attendance submitted!");
    })
    .catch(err => {
      alert("Error submitting attendance.");
    });
}
fetch("https://script.google.com/macros/s/AKfycbz2_0yKaSZ4WTO9CfddYaoXV_X4Vr1s7mKSDXQxbGyM51I4S6IUn6fhp4vM6QlimHiP/exec", {
  method: "POST",
  body: JSON.stringify({ date, attendance }),
  headers: {
    "Content-Type": "application/json"
  }
})
