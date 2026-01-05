let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (!text) return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    updateTasksList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText && newText.trim()) {
        tasks[index].text = newText.trim();
        updateTasksList();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

const updateProgress = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    document.getElementById("numbers").innerText =
        `${completed} / ${total}`;

    const percent = total === 0 ? 0 : (completed / total) * 100;
    document.getElementById("progress").style.width = percent + "%";

    const title = document.querySelector(".msg h1");
    const subtitle = document.querySelector(".msg h5");

    if (total > 0 && completed === total) {
        title.innerText = "Todo Done 🎉";
        subtitle.innerText = "Keep it up!";
        document.body.classList.add("celebrate");
        blastConfetti();
    } else {
        title.innerText = "Todo App";
        subtitle.innerText = "Alright, let's log your today's tasks";
        document.body.classList.remove("celebrate");
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="images/edit.png" onclick="editTask(${index})">
                    <img src="images/delete.png" onclick="deleteTask(${index})">
                </div>
            </div>
        `;

        li.querySelector("input")
          .addEventListener("change", () => toggleTaskComplete(index));

        taskList.appendChild(li);
    });

    updateProgress();
};

document.getElementById("newTask").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

const blastConfetti = () =>{
    const count = 200,
    defaults = {
    origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};

    
