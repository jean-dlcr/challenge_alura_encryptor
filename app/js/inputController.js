import { clearConsole, makeActive, showElement } from "./iconsClick.js";
import { encrypt, decrypt, textAreaIsEmpty, clearTextArea, hasSpecialCharacters } from "./encrypt_decrypt.js";


let lastInputConsoleRow = document.getElementById("startInputConsoleRow");

export function getLastInputConsoleRow() {
    return lastInputConsoleRow;
}

export function setLastInputConsoleRow(newElement) {
    lastInputConsoleRow = newElement;
}

function createHTMLRowConsole(type = 0) {
    return (
        `<div class="console-row flex flex-column">
            <div class="flex" style="column-gap: 0.5rem;">
                <label class="${type === 0 ? 'label-user color-alura' : ''}">${type === 0 ? '' : '>>'}</label>
                <input class="no-decoration-box" type="text" spellcheck="false" autocomplete="off"/>
            </div>
            <label class="no-display flex"></label>
        </div>`
    );
};

function createRowConsole(type = 0) {
    const el = document.querySelector("#consoleBox .window-content");
    const htmlString = createHTMLRowConsole(type);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const newRow = tempDiv.firstElementChild;
    addEnterListener(newRow.querySelector('input'), type == 0 ? inputStartEnter : inputEncryptEnter);

    if (type <= 0) {
        el.insertBefore(newRow, el.lastElementChild);
    } else {
        el.appendChild(newRow);
    }
    return newRow.querySelector('input');
};


function showErrorCommand(input = null, error = "") {

    const errorLabel = input.closest('.console-row').querySelector('label.no-display');
    if (errorLabel) {
        errorLabel.textContent = error;
        errorLabel.classList.remove("no-display");
    }
};

function onKeydown(e = null, key = "", fun = null) {

    if (e.key.toLowerCase() === key.toLowerCase()) {
        fun(e);
    }

}



function inputEncryptEnter(event) {
    event.target.disabled = true;
    event.target.style.pointerEvents = "none";

    let errorMsg = "";

    if (event.target.value === "exit" || event.target.value === "cls") {
        clearConsole();
    }
    else {
        const array_input = event.target.value.split(/\s+/);
        errorMsg = validateInput(clearArgs(array_input));
        if (errorMsg.length > 0) {
            showErrorCommand(event.target, errorMsg);
            lastInputConsoleRow = createRowConsole(1);
            setTimeout(() => {
                lastInputConsoleRow.focus();
            }, 100);
        } else {
            handleEncrypt(event.target, array_input, 1);
        }

    }
};

async function handleEncrypt(input = null, array_input = [], from = 0) {
    const filePathRegex_file = /^['"]\.\/File\.txt['"]$/;
    const filePathRegex_result = /^['"]\.\/Result\.txt['"]$/;
    let errorMsg = "";
    let typeFile = -1;

    if (array_input[0] === "-d") {
        if (filePathRegex_result.test(array_input[1])) {
            typeFile = 1;
        } else {
            errorMsg = "Fatal error. Use Result.txt to decrypt.";
        }
    } else if (array_input[0] === "-e") {
        if (filePathRegex_file.test(array_input[1])) {
            typeFile = 0;
        }
        else {
            errorMsg = "Fatal error. Use File.txt to encrypt.";
        }
    }
    if (errorMsg.length === 0 && typeFile !== -1) {
        let subError = "";
        if (textAreaIsEmpty(typeFile)) {
            subError = `${typeFile === 0 ? "File" : "Result"}.txt is empty. Nothing to ${typeFile === 0 ? "encrypt" : "decrypt"}.`;
        }

        if (subError.length === 0) {
            let fn;
            let elID;
            if (typeFile == 0) { fn = encrypt; clearTextArea("result_textarea"); elID = "fileBoxResult"; }
            else { fn = decrypt; clearTextArea("file_textarea"); elID = "fileBoxFile" };
            await showLoading(input);
            fn();
            showElement(document.getElementById(elID));
            makeActive(document.getElementById(elID));
        } else {
            showErrorCommand(input, subError);
        }
    } else {
        showErrorCommand(input, errorMsg);
    }

    lastInputConsoleRow = createRowConsole(from);
    setTimeout(() => {
        lastInputConsoleRow.focus();
    }, 100);
}


function validateInput(array_input = []) {

    if (!(array_input[0] && (array_input[0] === "-e" || array_input[0] === "-d"))) {
        return `Syntax error: ${array_input[0]} does not exist.`;
    }
    const filePathRegex = /^['"]\.\/(File|Result)\.txt['"]$/;
    if (!(array_input[1] && (filePathRegex.test(array_input[1])))) {
        return `File ${array_input[1]} not found`;
    }

    if(array_input[1].toLowerCase().includes("file.txt")){
        if(hasSpecialCharacters(0)) return `Error. Special characters or accents are not allowed.`;
    }else if(array_input[1].toLowerCase().includes("result.txt")){
        if(hasSpecialCharacters(1)) return `Error. Special characters or accents are not allowed.`;
    }

    return "";
}

export function inputStartEnter(event) {

    event.target.disabled = true;
    event.target.style.pointerEvents = "none";

    let errorMsg = "";

    if (event.target.value === "cls") {
        clearConsole();
    }
    else {
        const array_input = event.target.value.split(/\s+/);

        if (array_input[0] !== "encrypt") {
            errorMsg = `Command ${array_input[0]} not found.`;
        } else {
            if (array_input.length === 1) {
                document.getElementById("encryptWelcomeMessage").classList.remove("no-display");
                lastInputConsoleRow = createRowConsole(1);
            } else if (array_input.length > 1) {
                const args = clearArgs(array_input.slice(1));
                errorMsg = validateInput(args);
            }
        }

        if(array_input.length>1){
            if (errorMsg.length === 0) {
                handleEncrypt(event.target, array_input.slice(1), 0);
            } else {
                showErrorCommand(event.target, errorMsg);
                lastInputConsoleRow = createRowConsole();
            }
        }
        
    }

    setTimeout(() => {
        lastInputConsoleRow.focus();
    }, 100);
};

function clearArgs(array = []) {
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
    }
    return array;
}

function showLoading(input = null) {
    return new Promise((resolve) => {
        let progress = 0;
        const errorLabel = input.closest('.console-row').querySelector('label.no-display');
        errorLabel.classList.remove("no-display");
        errorLabel.textContent = `Loading ${progress}`;

        const interval = setInterval(() => {
            progress++;
            errorLabel.textContent = `Loading ${progress}`;
            if (progress === 100) {
                clearInterval(interval);
                resolve();
            }
        }, 30);
    });
}


export function addEnterListener(element = null, fn = null) {
    element.addEventListener('keydown', (e) => onKeydown(e, "enter", fn));
};
