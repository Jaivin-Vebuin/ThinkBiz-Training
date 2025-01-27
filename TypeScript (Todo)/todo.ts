// Define an interface for the task object
interface TodoItem {
    id: number;
    task: string;
    checkBox: boolean;
}

// Define the type for the array of todo items
type TodoArray = TodoItem[];

// Define the array with the type => TodoArray
let todoArray: TodoArray = JSON.parse(localStorage.getItem("message") ?? "[]");

// Function to set all the data to localStorage
function setAllData(): void {
    localStorage.setItem("message", JSON.stringify(todoArray));
}

// Function used when the task is done, but we want to replace it
function updateConditionBased(element: TodoItem): void {
    // Generate the editing area
    const editingArea = document.getElementById('editingArea') as HTMLElement;
    editingArea.innerHTML = '';

    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'editField');
    newLabel.textContent = "Update the task: ";

    const newTextArea = document.createElement('input');
    newTextArea.className = 'editField';
    newTextArea.id = 'editField';
    newTextArea.value = element.task;

    const finalEdit = document.createElement('button');
    finalEdit.className = "finalEditButton";
    finalEdit.id = "finalEditButton";
    finalEdit.textContent = "Save";

    // finalEdit handler
    finalEdit.addEventListener('click', function editContent() {
        const updatedTask = (document.getElementById('editField') as HTMLInputElement).value.trim();
        // If the entered value is the same as the previous one (no changes in the update)
        const isSameTask = element.task.toLowerCase() === updatedTask.toLowerCase();

        // If the task is empty or unchanged
        if (!updatedTask) {
            window.alert("Cannot leave empty!!");
        } else {
            // Task is not the same or changed with a different value
            if (!isSameTask) {
                window.alert("Successfully updated!!");
                element.task = updatedTask;
                element.checkBox = false;
                editingArea.innerHTML = '';
            } else {
                // Task is the same as before (no change)
                window.alert("You have entered the same previous thing!");
            }

            // Clear the editing area and re-enable the buttons
            editingArea.innerHTML = '';
            document.querySelectorAll('.editButton').forEach((button) => {
                (button as HTMLButtonElement).disabled = false;
                (button as HTMLButtonElement).style.opacity = '1';
            });

            // Again, load the latest data and save it to localStorage
            setAllData();
            loadPreviousData();
        }
    });

    // Append the children to the parent editing area
    editingArea.appendChild(newLabel);
    editingArea.appendChild(newTextArea);
    editingArea.appendChild(finalEdit);
}

// Function for handling the editing of a task
function handleEdit(element: TodoItem): void {
    // Disable the other buttons
    document.querySelectorAll('.editButton').forEach((button) => {
        (button as HTMLButtonElement).disabled = true;
        (button as HTMLButtonElement).style.opacity = '0.5';
    });

    // Check if the task is already done
    if (element.checkBox) {
        const decision = window.prompt("Task is already done!! Do you want to replace it with a new one? (yes/no)");

        if (decision === null) {
            // Handle the case where the user cancels the prompt
            window.alert("Prompt was cancelled. No action will be taken.");
            document.querySelectorAll('.editButton').forEach((button) => {
                (button as HTMLButtonElement).disabled = false;
                (button as HTMLButtonElement).style.opacity = '1';
            });
        } else {
            const lowerCaseDecision = decision.toLowerCase();

            // If user wants to replace the already done task with a new one
            if (lowerCaseDecision === "yes") {
                updateConditionBased(element);
            } else if (lowerCaseDecision === "no") {
                // If no, then re-enable all edit buttons
                document.querySelectorAll('.editButton').forEach((button) => {
                    (button as HTMLButtonElement).disabled = false;
                    (button as HTMLButtonElement).style.opacity = '1';
                });
            } else {
                // If any other response than yes/no
                window.alert("Please enter a valid response!!");
                document.querySelectorAll('.editButton').forEach((button) => {
                    (button as HTMLButtonElement).disabled = false;
                    (button as HTMLButtonElement).style.opacity = '1';
                });
            }
        }
    } else {
        // If task is not done already, follow regular pattern
        updateConditionBased(element);
    }

}

// Function for handling the delete
function handleDelete(element: TodoItem): void {
    const editingArea = document.getElementById('editingArea') as HTMLElement;
    // Filter the data with current object id
    todoArray = todoArray.filter((ele) => ele.id !== element.id);
    setAllData();
    loadPreviousData();
    editingArea.innerHTML = '';
}

// Function which loads the data and creates the row of the table
function loadPreviousData(): void {
    const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;
    tableBody.innerHTML = '';
    const dataAvailable = todoArray.length > 0;

    if (dataAvailable) {
        todoArray.forEach((element) => {
            // For each element in array create a row of the table
            const tableDataRow = document.createElement('tr');
            tableDataRow.className = 'tableDataRow';

            const tableCell01 = document.createElement('td');
            tableCell01.className = 'tableRowMark';
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.checked = element.checkBox;

            // Update the status based on check box
            checkBox.addEventListener('change', function () {
                element.checkBox = this.checked;
                setAllData();
                loadPreviousData();
            });

            // Styling based on the checkbox
            const tableCell02 = document.createElement('td');
            tableCell02.className = 'tableRowMessage';
            tableCell02.textContent = element.task;
            if (element.checkBox) {
                tableCell02.style.textDecoration = 'line-through';
            } else {
                tableCell02.style.textDecoration = 'none';
            }

            // Create the buttons for edit and delete
            const tableCell03 = document.createElement('td');
            tableCell03.className = 'tableRowEditBtn';
            const editButton = document.createElement('button');
            editButton.className = 'editButton';
            editButton.id = 'editButton';
            editButton.textContent = 'Edit';
            // Handler for edit button
            editButton.addEventListener('click', () => handleEdit(element));

            const tableCell04 = document.createElement('td');
            const removeButton = document.createElement('button');
            tableCell04.className = 'tableRowDeleteBtn';
            removeButton.className = 'removeButton';
            removeButton.textContent = 'Delete';
            // Handler for remove button
            removeButton.addEventListener('click', () => handleDelete(element));

            // Append all the children to their parents
            tableCell01.appendChild(checkBox);
            tableCell03.appendChild(editButton);
            tableCell04.appendChild(removeButton);

            tableDataRow.appendChild(tableCell01);
            tableDataRow.appendChild(tableCell02);
            tableDataRow.appendChild(tableCell03);
            tableDataRow.appendChild(tableCell04);

            tableBody.appendChild(tableDataRow);
        });
    } else {
        // Display empty message if no tasks are present
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'emptyMessage'
        emptyMessage.textContent = 'There are no tasks to display !!'
        tableBody.appendChild(emptyMessage);
    }
}

// Event handling for entering the task
document.querySelector('.messageForm')?.addEventListener('submit', function handleSubmit(event: Event) {
    event.preventDefault();
    const inputTask = (document.getElementById('messageAdder') as HTMLInputElement).value.trim();

    // Checking if similar task is present in array
    const isAlreadyPresent = (inputTask: string): TodoItem | undefined => {
        return todoArray.find((ele) => ele.task.toLowerCase() === inputTask.toLowerCase());
    };

    if (inputTask) {
        if (isAlreadyPresent(inputTask)) {
            alert("Task is already present in the list!");
        } else {
            const storeObj: TodoItem = { id: todoArray.length, task: inputTask, checkBox: false };
            todoArray.push(storeObj);
            loadPreviousData();
        }
    } else {
        alert("Can not enter empty to-do");
        loadPreviousData();
    }

    (document.getElementById('messageAdder') as HTMLInputElement).value = '';
});

// Initial load
loadPreviousData();

export default {}