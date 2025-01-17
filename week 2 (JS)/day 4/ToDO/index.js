// define the array
let todoArray = JSON.parse(localStorage.getItem("message")) || [];

// function to set all the data to => localstorage
function setAllData() {
    localStorage.setItem("message", JSON.stringify(todoArray));
}

// this is function used when the task is done, but we want to replace it
function updateConditionBased(element) {
    // generate the editing area
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

    // finalEdit handeler
    finalEdit.addEventListener('click', function editContent() {
        const updatedTask = document.getElementById('editField').value.trim();
        // if the entered value is same as previous || no changes in the update
        const isSameTask = element.task.toLowerCase() === updatedTask.toLowerCase();

        // if changes are empty =>
        if (!updatedTask) {
            window.alert("Cannot leave empty!!");
        } else {
            // task is not same || changed with different value =>
            if (!isSameTask) {
                window.alert("Successfully updated!!");
                element.task = updatedTask;
                element.checkBox = false;
                editingArea.innerHTML = '';

            } else {
                // task is same as previous || not changed
                window.alert("You have entered the same previous thing!");
            }

            // Clear the editing area and re-enable the buttons
            editingArea.innerHTML = '';
            document.querySelectorAll('.editButton').forEach(button => {
                button.disabled = false;
                button.style.opacity = 1;
            });

            // again load the latest data and save it to localstorage
            setAllData();
            loadPreviousData();
        }
    });

    // append the children to parent editing area
    editingArea.appendChild(newLabel);
    editingArea.appendChild(newTextArea);
    editingArea.appendChild(finalEdit);
}

// this is function for handeling the editing of task =>
function handleEdit(element) {
    // first disable the other buttons
    document.querySelectorAll('.editButton').forEach(button => {
        button.disabled = true;
        button.style.opacity = 0.5;
    });

    // check if task is already done =>
    if (element.checkBox) {
        const decision = window.prompt("Task is already done!! Do you want to replace it with a new one? (yes/no)").toLowerCase();

        // if user wants to replace the already done task with new one =>
        if (decision === "yes") {
            // call the function with passing current object
            updateConditionBased(element);
        } else if (decision === "no") {
            // if no then re-enable all edit buttons
            document.querySelectorAll('.editButton').forEach(button => {
                button.disabled = false;
                button.style.opacity = 1;
            });
        } else {
            // if any other response than yes/no =>
            window.alert("Please enter a valid response!!");
            document.querySelectorAll('.editButton').forEach(button => {
                button.disabled = false;
                button.style.opacity = 1;
            });
        }
    } else {
        // if task is not done already, then follow regular pattern =>
        updateConditionBased(element);
    }
}

// this is the function for handeling the delete =>
function handleDelete(element) {
    const editingArea = document.getElementById('editingArea');
    // filter the data with current object id
    todoArray = todoArray.filter(ele => ele.id !== element.id);
    setAllData();
    loadPreviousData();
    editingArea.innerHTML = '';
}

// this is the function which loads the data || creates the row of table
function loadPreviousData() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    const dataAvailable = todoArray.length>0;
    
    // if data is already present in local storage
    if (dataAvailable) {
        todoArray.forEach(element => {
            // for each element in array create row of the table
            const tableDataRow = document.createElement('tr');
            tableDataRow.className = 'tableDataRow';

            const tableCell01 = document.createElement('td');
            tableCell01.className = 'tableRowMark';
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.checked = element.checkBox;

            // update the status based on check box
            checkBox.addEventListener('change', function () {
                element.checkBox = this.checked;
                setAllData();
                loadPreviousData();
            });

            // styling based on the checkbox
            const tableCell02 = document.createElement('td');
            tableCell02.className = 'tableRowMessage';
            tableCell02.textContent = element.task;
            if (element.checkBox) {
                tableCell02.style.textDecoration = 'line-through';
            }
            else {
                tableCell02.style.textDecoration = 'none';
            }

            // create the buttons of edit and delete
            const tableCell03 = document.createElement('td');
            tableCell03.className = 'tableRowEditBtn';
            const editButton = document.createElement('button');
            editButton.className = 'editButton';
            editButton.id = 'editButton';
            editButton.textContent = 'Edit';
            // handeler for edit button
            editButton.addEventListener('click', () => handleEdit(element));

            const tableCell04 = document.createElement('td');
            const removeButton = document.createElement('button');
            tableCell04.className = 'tableRowDeleteBtn';
            removeButton.className = 'removeButton';
            removeButton.textContent = 'Delete';
            // hendeler for remove button
            removeButton.addEventListener('click', () => handleDelete(element));

            // append all the child to their parents
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
        // display empty message if no any task is there
        const emptyMessage = document.createElement('div'); 
        emptyMessage.className = 'emptyMessage' 
        emptyMessage.textContent = 'There are no tasks to display !!' 
        tableBody.appendChild(emptyMessage);
    }
}

// event handeling of entering the task
document.querySelector('.messageForm').addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    let inputTask = document.getElementById('messageAdder').value.trim();
    // checking if similar task is present in array
    const isAlreadyPresent = (inputTask) => {
        return todoArray.find(ele => ele.task.toLowerCase() === inputTask.toLowerCase())
    }
    // if input is not empty
    if (inputTask) {
        // if task is already present in array
        if (isAlreadyPresent(inputTask)) {
            alert("Task is already present in the list!");
        } else {
            // otherwise add it in array
            const storeObj = { id: todoArray.length, task: inputTask, checkBox: false };
            todoArray.push(storeObj);
            loadPreviousData();
        }
    } else {
        // if field is empty
        alert("Can not enter empty to-do");
        loadPreviousData();
    }
    // empty the input after adding
    document.getElementById('messageAdder').value = '';
});

// initial load
loadPreviousData();