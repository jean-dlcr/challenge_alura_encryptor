import { makeDraggable } from './drag.js';
import { addEnterListener, inputStartEnter, getLastInputConsoleRow } from './inputController.js';
import { addClickListener, addDobleClickListener, hideElement, showElement, toggleBox, isVisible, clearConsole, hideFileIcon, showFileIcon, setArrayFile, toggleFileBox } from './iconsClick.js';
import { clearTextArea, handleEncryptDecryptShortcut} from './encrypt_decrypt.js';
import { addClickListener as addClickCopyListener, copy, animationCopied } from '../../js/copy_button.js';


let lastInput;
let timeDisplay = document.getElementById("timer");

document.addEventListener("DOMContentLoaded", function () {
    refreshTime();
        document.body.classList.remove('no-display');
    lastInput = document.getElementById("startInputConsoleRow");
    lastInput.focus();
    
});

makeDraggable('consoleBox', 'consoleHeader');

makeDraggable('fileBoxFile', 'fileBoxFile_header');
makeDraggable('fileBoxResult', 'fileBoxResult_header');

makeDraggable('alertBox', 'alertBox_header');

addClickListener(document.getElementById("btnIcon_console"), ()=>{const element=document.getElementById("consoleBox"); toggleBox(element); if(isVisible(element)){focusLastInputConsole();}});
addClickListener(document.getElementById("btnMinimizeConsole"), ()=>hideElement(document.getElementById("consoleBox")));
addClickListener(document.getElementById("btnCloseConsole"), ()=>{hideElement(document.getElementById("consoleBox")); clearConsole();});

addEnterListener(document.getElementById("startInputConsoleRow"), inputStartEnter);

addClickListener(document.getElementById("btnIcon_filetext"), ()=>toggleFileBox());

addDobleClickListener(document.getElementById("btnDesktop_fileText"), () => {showElement(document.getElementById("fileBoxFile")); setTimeout(()=>{document.getElementById("file_textarea").focus()},100); showFileIcon(document.getElementById("btnIcon_filetext")); setArrayFile("fileBoxFile");});
addClickListener(document.getElementById("btnMinimizeFileText_File"), ()=>{hideElement(document.getElementById("fileBoxFile")); focusLastInputConsole();});
addClickListener(document.getElementById("btnCloseFileText_File"), ()=>{clearTextArea("file_textarea"); hideElement(document.getElementById("fileBoxFile")); focusLastInputConsole(); hideFileIcon(document.getElementById("btnIcon_filetext")); setArrayFile("fileBoxFile", false);});

addDobleClickListener(document.getElementById("btnDesktop_resultText"), () => {showElement(document.getElementById("fileBoxResult")); setTimeout(()=>{document.getElementById("result_textarea").focus()},100); showFileIcon(document.getElementById("btnIcon_filetext")); setArrayFile("fileBoxResult");});
addClickListener(document.getElementById("btnMinimizeFileText_Result"), ()=>{hideElement(document.getElementById("fileBoxResult")); focusLastInputConsole();});
addClickListener(document.getElementById("btnCloseFileText_Result"), ()=>{clearTextArea("result_textarea"); hideElement(document.getElementById("fileBoxResult")); focusLastInputConsole(); hideFileIcon(document.getElementById("btnIcon_filetext")); setArrayFile("fileBoxResult", false);});

addDobleClickListener(document.getElementById("btnDesktop_encrypt"), ()=>handleEncryptDecryptShortcut("encrypt"));
addDobleClickListener(document.getElementById("btnDesktop_decrypt"), ()=>handleEncryptDecryptShortcut("decrypt"));

addClickListener(document.getElementById("btnCloseAlertBox"),()=>hideElement(document.getElementById("alertBox")));

function focusLastInputConsole(){
    lastInput = getLastInputConsoleRow();
    setTimeout(()=>{lastInput.focus()},100);
}


function refreshTime() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let formattedString = `${hours}:${minutes}`;
    timeDisplay.innerHTML = formattedString;
}

setInterval(refreshTime,1000);

const copy_symbols = document.querySelectorAll("button.copy-symbol");
const toogleToast = document.getElementById("toogleToast");

copy_symbols.forEach(element => {
    let textareaElement = element.nextElementSibling;
    if(textareaElement.tagName.toLowerCase() ==="textarea"){
        addClickCopyListener(element, ()=>{toogleToast.checked=true; copy(textareaElement); customAnimationCopied(element.querySelector("span"))});
    }
});


function customAnimationCopied(element=null){
    if(element){
        animationCopied(element)
        .then(()=>{
            toogleToast.checked = false;
        });
    }
}











