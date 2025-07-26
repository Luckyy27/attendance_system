const PASSWORD = "teacher123";
const API_URL = "https://script.google.com/macros/s/AKfycbzUy7-vYB2d7gqw63GroPBzGhqJl-kmZjPgvN4He9alBO-s6E9_eWjervcU9jM5H4KS/exec";

let students = [];

function login() {
  const pass = document.getElementById("password").value;
  if (pass !== PASSWORD) return alert("Wrong password");

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      students = data;
      document.getElementById("attendanceForm").classList.remove("hidden");
      renderStudents();
    })
    .catch(() => alert("Failed to load students"));
}

function renderStudents() {
  const container = document.getElementById("studentsList");
  container.innerHTML = "";
  students.forEach(s => {
    container.innerHTML += `
      <div class="p-2 border rounded">
        <div class="font-semibold">${s.name} (${s.roll})</div>
        <label><input type="radio" name="status-${s.roll}" value="P" checked /> P</label>
        <label><input type="radio" name="status-${s.roll}" value="A" /> A</label>
        <label><input type="radio" name="status-${s.roll}" value="L" /> L</label>
      </div>`;
  });
}

function submitAttendance() {
  const date = document.getElementById("datePicker").value;
  if (!date) return alert("Select a date");

  const attendance = students.map(s => {
    const radios = document.getElementsByName(`status-${s.roll}`);
    let status = "P";
    radios.forEach(r => { if (r.checked) status = r.value; });
    return { roll: s.roll, status };
  });

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, attendance })
  })
    .then(res => res.text())
    .then(msg => alert("Attendance submitted"))
    .catch(() => alert("Error submitting attendance"));
}
