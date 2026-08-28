// Grab the input box and the Add button from the page.
const taskInput = document.getElementById("Task");
const addBtn = document.getElementById("Add");
const clearBtn = document.getElementById("Clear");
const finishButtons = document.querySelectorAll(".finished");

// IDs for the three task text <span> elements we fill once.
const taskTextIds = ["Task1Text", "Task2Text", "Task3Text"];
// Tracks how many tasks have been filled so far.
let filledCount = 0;

function replaceNextTask(text) {
  // Stop once all three slots are filled.
  if (filledCount >= taskTextIds.length) return false;

  // Find the next task text span.
  const span = document.getElementById(taskTextIds[filledCount]);

  // Replace the visible text.
  span.textContent = text;

  // Move to the next slot (no looping).
  filledCount += 1;
  return true;
}

// When the Add button is clicked, replace the next task slot.
addBtn.addEventListener("click", () => {
  // Trim to avoid accepting only spaces.
  const text = taskInput.value.trim();
  if (!text) return;

  if (replaceNextTask(text)) {
    // Clear the input after adding.
    taskInput.value = "";
  }
});

// Allow pressing Enter in the input to add the task too.
taskInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  // Trim to avoid accepting only spaces.
  const text = taskInput.value.trim();
  if (!text) return;

  if (replaceNextTask(text)) {
    // Clear the input after adding.
    taskInput.value = "";
  }
});

//sets the clear button to reset the task text spans to their default values when clicked
clearBtn.addEventListener("click", () => {
  // Clear all task text spans.
  taskTextIds.forEach(id => {
    const span = document.getElementById(id);
    span.textContent = "Task " + (id.slice(4, 5)); // Reset to "Task 1", "Task 2", etc.
    span.classList.remove("done"); // Remove strike-through.
  });

  // Allow filling tasks again from the start.
  filledCount = 0;
});

// Set each "Task Finished" button to mark only its task as completed.
finishButtons.forEach(button => {
  button.addEventListener("click", () => {
    const label = button.previousElementSibling;
    if (!label) return;

    const span = label.querySelector("span");
    if (!span) return;

    span.classList.add("done");
  });
});dw
