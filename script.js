
const students = [
  { name: "Aarav Sharma", age: 20, course: "Computer Science" },
  { name: "Meera Iyer",   age: 19, course: "Mechanical Engineering" },
  { name: "Rohan Verma",  age: 21, course: "Business Studies" }
];
 
const newStudents = [
  { name: "Ananya Gupta", age: 20, course: "Data Science" },
  { name: "Kabir Singh",  age: 22, course: "Architecture" },
  { name: "Isha Nair",    age: 19, course: "Psychology" },
  { name: "Vihaan Reddy", age: 21, course: "Electronics" }
];
 
const studentList = document.getElementById("studentList");
const statusText  = document.getElementById("status");
const showBtn     = document.getElementById("showBtn");
const addBtn      = document.getElementById("addBtn");
const themeBtn    = document.getElementById("themeBtn");

function showStudents() {
  studentList.innerHTML = "";
 
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
 
    const card = document.createElement("div");
    card.className = "student-card";
    card.innerHTML = `
      <h2>${s.name}</h2>
      <p>Age: ${s.age}</p>
      <p>Course: ${s.course}</p>
    `;
    studentList.appendChild(card);
  }
}
 
function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle("error", isError);
}
 
function addStudentCallback(student, callback) {
  setTimeout(function () {
    students.push(student);
    callback();
  }, 2000);
}
 
function addStudent(student) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (!student) {
        reject(new Error("No more students available to add."));
        return;
      }
      students.push(student);
      resolve(student);
    }, 2000);
  });
}
 
async function handleAddStudent() {
  addBtn.disabled = true;
  setStatus("Adding student...");
 
  try {
    const next = newStudents.shift();      
    const added = await addStudent(next);  
    showStudents();                        
    setStatus(`${added.name} was added.`);
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    addBtn.disabled = false;
  }
}
 
function changeTheme() {
  document.body.classList.toggle("dark");
}
 
showBtn.addEventListener("click", function () {
  setStatus("");
  showStudents();
});
addBtn.addEventListener("click", handleAddStudent);
themeBtn.addEventListener("click", changeTheme);
 