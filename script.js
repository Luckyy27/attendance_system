const PASSWORD = "123456"; // Temporary login password
const API_URL = "https://script.google.com/macros/s/AKfycbzUy7-vYB2d7gqw63GroPBzGhqJl-kmZjPgvN4He9alBO-s6E9_eWjervcU9jM5H4KS/exec"; // Replace with your deployed script URL

let students = [];

function login() {
  const inputPass = document.getElementById("password").value;
  if (inputPass === PASSWORD) {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        students = data;
        document.getElementById("attendanceForm").classList.remove("hidden");
        renderStudents();
      })
      .catch(() => alert("Error fetching students."));
  } else {
    alert("Invalid password!");
  }
}

function renderStudents() {
  const container = document.getElementById("studentsList");
  container.innerHTML = "";
  students.forEach(student => {
    container.innerHTML += `
      <div class="p-3 border rounded">
        <div class="font-semibold mb-1">${student.name} (${student.roll})</div>
        <div class="flex gap-4">
          <label><input type="radio" name="status-${student.roll}" value="P" checked /> P</label>
          <label><input type="radio" name="status-${student.roll}" value="A" /> A</label>
          <label><input type="radio" name="status-${student.roll}" value="L" /> L</label>
        </div>
      </div>
    `;
  });
}

function submitAttendance() {
  const date = document.getElementById("datePicker").value;
  if (!date) return alert("Please select a date");

  const attendance = students.map(s => {
    const radios = document.getElementsByName(`status-${s.roll}`);
    let status = "P";
    radios.forEach(r => { if (r.checked) status = r.value; });
    return { roll: s.roll, status };
  });

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ date, attendance }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(msg => alert("Attendance submitted successfully!"))
    .catch(err => alert("Error submitting attendance."));
}
