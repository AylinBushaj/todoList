const input = document.getElementById("task")
const addbtn = document.getElementById("liveToastBtn")
const todoList = document.getElementById("list")

document.addEventListener("DOMContentLoaded", loadTasks);

// localStorage

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("close");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

addbtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  const li = document.createElement("li");
  li.textContent = input.value;


  // Silme İşlemi
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "x";
  deleteBtn.classList.add("close");
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
  saveTasks();
  input.value = "";
});


todoList.addEventListener("click", (e) => {

  // Görev Tamamlandı
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveTasks();
  }

  // Görev Silindi
  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#list li").forEach(li => {
    tasks.push(li.textContent.replace("x", "").trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



