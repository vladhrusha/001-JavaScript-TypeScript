import {tableBody, form} from './index';


function onClearTable(){
    tableBody!.innerHTML = '';
}

function composeTableRow(inputText : string){
    return `
    <tr class="table__row">
	<td class="outputTd">${inputText}</td>
	<td>
	<img class="image editImage" src="../images/notes.png" />
	<img class="image trashImage" src="../images/trash.png" />
	</td>
	</tr>
    `;
}

function clearRow(e : Event){
    let currentTarget = <HTMLElement>e.currentTarget;
    currentTarget.parentElement?.parentElement?.remove()
}

function editRow(e : Event){
    const inputText = (<HTMLInputElement>form!.querySelector('.input')!).value;
    if (isEmptyOrWhitespaceOnly(inputText)){
        return;
    }
    let td = (<HTMLElement>e.currentTarget).parentElement?.parentElement?.querySelector('.outputTd');
    td!.innerHTML = inputText;

    (<HTMLInputElement>form!.querySelector('.input')!).value = '';
}


function isEmptyOrWhitespaceOnly(str : string){
    if (str == '' || str.trim().length === 0){
        return true;
    } return false;
}

export {onClearTable, clearRow, isEmptyOrWhitespaceOnly, composeTableRow, editRow};

