import { makeActive, showElement } from "./iconsClick.js";

export function textAreaIsEmpty(typeFile = 0) {
    return document.getElementById(typeFile === 0 ? "file_textarea" : "result_textarea").value.trim().length <= 0;
}

export function hasSpecialCharacters(typeFile =0){
    const regex = /^[a-z0-9 ¿?!¡]*$/i;
    return !regex.test(document.getElementById(typeFile === 0 ? "file_textarea" : "result_textarea").value.trim().toLowerCase());
}

export function hasMayusLetters(typeFile=0){
    let cad = document.getElementById(typeFile === 0 ? "file_textarea" : "result_textarea").value.trim() ;
    return cad !== cad.toLowerCase();
}

function showErrorAlert(msg="") {
    const alertBox = document.getElementById("alertBox");
    const errorMsg = alertBox.getElementsByClassName("window-content")[0].getElementsByTagName("p")[0];
    errorMsg.textContent = msg;
    showElement(alertBox);
}

export function handleEncryptDecryptShortcut(what = "") {
    what = what.toLowerCase();
    let indexTextarea;
    let showID;
    let clearID;
    let fn;

    if (what === "encrypt" || what === "decrypt") {
        if (what === "encrypt") { indexTextarea = 0; showID = "fileBoxResult"; clearID = "result_textarea"; fn = encrypt; }
        else if (what === "decrypt") { indexTextarea = 1; showID = "fileBoxFile", clearID = "file_textarea"; fn = decrypt; }

        if (textAreaIsEmpty(indexTextarea)) showErrorAlert(`${indexTextarea === 0 ? "File" : "Result"}.txt is empty. Nothing to ${indexTextarea === 0 ? "encrypt" : "decrypt"}`);

        else {
            if(hasMayusLetters(indexTextarea)){
                showErrorAlert(`Error. Only lower letters are allowed`);
                return null;
            }
            if(hasSpecialCharacters(indexTextarea)) showErrorAlert(`Error. Special characters or accents are not allowed.`);
            else{
                clearTextArea(clearID);
            setTimeout(() => {
                fn();
                showElement(document.getElementById(showID));
                makeActive(document.getElementById(showID));
            }, 2000);
            }
        }
    }
}


export function encrypt() {
    const text = (document.getElementById("file_textarea").value).toLowerCase();

    let result = "";
    let changedChar = "";
    text.split('').forEach(char => {
        changedChar = "";
        switch (char) {
            case "a":
                changedChar = "ai";
                break;
            case "e":
                changedChar = "enter";
                break;
            case "i":
                changedChar = "imes";
                break;
            case "o":
                changedChar = "ober";
                break;
            case "u":
                changedChar = "ufat";
                break;
        }
        if (changedChar === "") {
            result += char;
        } else {
            result += changedChar;
        }
    });
    document.getElementById("result_textarea").value = result;
}

export function decrypt() {
    const encrypt = document.getElementById("result_textarea").value;
    let result = "";

    result = encrypt.replace(/enter/g, "E");
    result = result.replace(/ufat/g, "U");
    result = result.replace(/ober/g, "O");
    result = result.replace(/imes/g, "I");
    result = result.replace(/ai/g, "A");

    result = result.toLowerCase();
    document.getElementById("file_textarea").value = result;

}

export function clearTextArea(id=""){
    if(id.length>0){
        document.getElementById(id).value = "";
    }
}