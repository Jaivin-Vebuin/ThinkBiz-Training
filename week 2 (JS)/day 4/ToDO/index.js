let todoArray = JSON.parse(localStorage.getItem("message")) || [];

function setAllData() {
    localStorage.setItem("message", JSON.stringify(todoArray));
}

function updateConditionBased(element) {
    const editingArea = document.getElementById('editingArea');
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

    finalEdit.addEventListener('click', function editContent() {
        const updatedTask = document.getElementById('editField').value.trim();
        const isSameTask = element.task.toLowerCase() === updatedTask.toLowerCase();

        if (!updatedTask) {
            window.alert("Cannot leave empty!!");
        } else {
            if (!isSameTask) {
                window.alert("Successfully updated!!");
                element.task = updatedTask;
                element.checkBox = false;
                editingArea.innerHTML = '';

            } else {
                window.alert("You have entered the same previous thing!");
            }

            // Clear the editing area and re-enable the buttons
            editingArea.innerHTML = '';
            document.querySelectorAll('.editButton').forEach(button => {
                button.disabled = false;
                button.style.opacity = 1;
            });

            setAllData();
            loadPreviousData();
        }
    });

    editingArea.appendChild(newLabel);
    editingArea.appendChild(newTextArea);
    editingArea.appendChild(finalEdit);
}

function handleEdit(element) {
    document.querySelectorAll('.editButton').forEach(button => {
        button.disabled = true;
        button.style.opacity = 0.5;
    });

    if (element.checkBox) {
        const decision = window.prompt("Task is already done!! Do you want to replace it with a new one? (yes/no)").toLowerCase();

        if (decision === "yes") {
            updateConditionBased(element);
        } else if (decision === "no") {
            document.querySelectorAll('.editButton').forEach(button => {
                button.disabled = false;
                button.style.opacity = 1;
            });
        } else {
            window.alert("Please enter a valid response!!");
            document.querySelectorAll('.editButton').forEach(button => {
                button.disabled = false;
                button.style.opacity = 1;
            });
        }
    } else {
        updateConditionBased(element);
    }
}

function handleDelete(element) {
    const editingArea = document.getElementById('editingArea');
    todoArray = todoArray.filter(ele => ele.id !== element.id);
    setAllData();
    loadPreviousData();
    editingArea.innerHTML = '';
}

function loadPreviousData() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    todoArray.forEach(element => {
        const tableDataRow = document.createElement('tr');
        tableDataRow.className = 'tableDataRow';

        const tableCell01 = document.createElement('td');
        tableCell01.className = 'tableRowMark';
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = element.checkBox;

        checkBox.addEventListener('change', function () {
            element.checkBox = this.checked;
            setAllData();
            loadPreviousData();
        });

        const tableCell02 = document.createElement('td');
        tableCell02.className = 'tableRowMessage';
        tableCell02.textContent = element.task;
        if (element.checkBox) {
            tableCell02.style.textDecoration = 'line-through';
        }
        else {
            tableCell02.style.textDecoration = 'none';
        }

        const tableCell03 = document.createElement('td');
        tableCell03.className = 'tableRowEditBtn';
        const editButton = document.createElement('button');
        editButton.className = 'editButton';
        editButton.id = 'editButton';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => handleEdit(element));

        const tableCell04 = document.createElement('td');
        const removeButton = document.createElement('button');
        tableCell04.className = 'tableRowDeleteBtn';
        removeButton.className = 'removeButton';
        removeButton.textContent = 'Delete';
        removeButton.addEventListener('click', () => handleDelete(element));

        tableCell01.appendChild(checkBox);
        tableCell03.appendChild(editButton);
        tableCell04.appendChild(removeButton);

        tableDataRow.appendChild(tableCell01);
        tableDataRow.appendChild(tableCell02);
        tableDataRow.appendChild(tableCell03);
        tableDataRow.appendChild(tableCell04);

        tableBody.appendChild(tableDataRow);
    });
}

document.querySelector('.messageForm').addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    let inputTask = document.getElementById('messageAdder').value.trim();
    const isAlreadyPresent = (inputTask) => {
        return todoArray.find(ele => ele.task.toLowerCase() === inputTask.toLowerCase())
    }
    if (inputTask) {
        if (isAlreadyPresent(inputTask)) {
            alert("Task is already present in the list!");
        } else {
            const storeObj = { id: todoArray.length, task: inputTask, checkBox: false };
            todoArray.push(storeObj);
            loadPreviousData();
        }
    } else {
        alert("Can not enter empty to-do");
        loadPreviousData();
    }
    document.getElementById('messageAdder').value = '';
});

loadPreviousData();