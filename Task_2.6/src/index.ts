import { onClearTable, clearRow, editRow, composeTableRow, isEmptyOrWhitespaceOnly } from "./tableManipulation";
const form = document.querySelector(".todo__form");
const tableBody = document.querySelector("tbody");
const clearButton = document.querySelector(".clearButton");
form!.addEventListener('submit', onSubmit);
clearButton?.addEventListener('click', onClearTable);

function onSubmit(e : Event) {
    e.preventDefault();
    const inputText = (<HTMLInputElement>form!.querySelector('.input')!).value;
    if (isEmptyOrWhitespaceOnly(inputText)){
        return;
    }
    tableBody!.innerHTML += composeTableRow(inputText);

    const trashImages = tableBody!.querySelectorAll('.trashImage');
    trashImages.forEach((trashImage) => {
        trashImage.addEventListener('click', clearRow);
    });

    const editImages = tableBody!.querySelectorAll('.editImage');
    editImages.forEach((editImage) => {
        editImage.addEventListener('click', editRow);
    });


    (<HTMLInputElement>form!.querySelector('.input')!).value = '';
}

export {tableBody, form};


