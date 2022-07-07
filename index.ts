const form = document.querySelector(".todo__form");
const tableBody = document.querySelector("tbody");
const clearButton = document.querySelector(".clearButton");

form!.addEventListener('submit', onSubmit);
clearButton?.addEventListener('click', onClearTable);


function onSubmit(e) {
    e.preventDefault();
    const inputText = form!.input.value;
    if (isEmptyOrWhitespaceOnly(inputText)){
        return;
    }
    tableBody!.innerHTML += composeTableRow(inputText);


    //last/first(Element)Child, querySelector applies eventListener only to one image
    const trashImages = tableBody!.querySelectorAll('.trashImage');
    trashImages.forEach((trashImage){
        trashImage.addEventListener('click', clearRow);
    })

    const editImages = tableBody!.querySelectorAll('.editImage');
    editImages.forEach((editImage){
        editImage.addEventListener('click', editRow);
    })


    form!.input.value = '';
}

function onClearTable(){
    tableBody!.innerHTML = '';
}

function composeTableRow(inputText : string){
    return `
    <tr class="table__row">
	<td>${inputText}</td>
	<td>
	<img class="image editImage" src="./images/notes.png" />
	<img class="image trashImage" src="./images/trash.png" />
	</td>
	</tr>
    `;
}

function clearRow(e){
    e.target.parentElement.parentElement.remove();
}
function editRow(e){
    const inputText = form!.input.value;
    if (isEmptyOrWhitespaceOnly(inputText)){
        return;
    }

    e.target.parentElement.parentElement.querySelector('td').innerHTML = inputText;
    form!.input.value = '';
}

function isEmptyOrWhitespaceOnly(str : string){
    if (str == '' || str.trim().length === 0){
        return true;
    } return false;
}