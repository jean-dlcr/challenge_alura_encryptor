
import { addEnterListener, inputStartEnter, getLastInputConsoleRow, setLastInputConsoleRow } from './inputController.js';

const defaultConsoleContent = document.getElementsByClassName("window-content")[0].innerHTML;

let array_filetext = {};
let countVisibleBox = 0;


Array.from(document.getElementsByClassName("window-container")).forEach(container => {
    container.style.display = "none";
});


export function toggleFileBox() {
    const visibles = Object.entries(array_filetext)
                                            .filter(([key, value]) => value === true)
                                            .map(([key, value]) => key);
    visibles.forEach(key => toggleBox(document.getElementById(key)));
}

export function showFileIcon(element = null) {
    if (!isVisible(element)) {
        element.style.display = "flex"
    }
}

export function setArrayFile(key = "", value = true) {
    array_filetext[key] = value;
}

export function hideFileIcon(element = null) {
    countVisibleBox = Object.values(array_filetext).filter(value => value === true).length;
    
    if (countVisibleBox <= 1) {
        element.style.display = "none";
    }
}

export function showElement(element) {
    if (!isVisible(element)) {
        element.style.display = "flex";
        element.classList.add("show");
        makeActive(element);
    }
    
}

export function makeActive(element =null){
    removeActiveFromOthers();
    element.classList.add("window-active");
}

function removeActiveFromOthers() {
    const divs = document.getElementsByClassName("window-active");
    for (let i = 0; i < divs.length; i++) {
        divs[i].classList.remove("window-active");
    }
}

export function hideElement(element) {
    if (isVisible(element)) {
        element.classList.remove("show");
        setTimeout(() => {
            element.style.display = "none";
        }, 900);
    }
}


export function isVisible(element = null) {
    return !(element.style.display === "none");
}

function createDoubleTapHandler(callback) {
    let lastTouchTime = 0;
    const doubleTapThreshold = 300;

    return function handleDoubleTap(event) {
        const now = Date.now();
        if (now - lastTouchTime < doubleTapThreshold) {
            callback(event);
            event.preventDefault();
        }
        lastTouchTime = now;
    };
}

export function addDobleClickListener(element = null, callback = null) {
    if (element && callback) {
        const doubleTapHandler = createDoubleTapHandler(callback);
        element.addEventListener("dblclick", callback);
        element.addEventListener("touchstart", doubleTapHandler, { passive: false });
    }
}

export function toggleBox(element = null) {
    if (isVisible(element)) hideElement(element);
    else showElement(element);
}

export function addClickListener(element = null, fn = null) {
    if (element && fn) {
        element.addEventListener('click', fn);
    }
}

export function clearConsole() {
    document.getElementsByClassName("window-content")[0].innerHTML = defaultConsoleContent;
    setLastInputConsoleRow(document.getElementById("startInputConsoleRow"));
    addEnterListener(document.getElementById("startInputConsoleRow"), inputStartEnter);
    setTimeout(() => {
        getLastInputConsoleRow().focus();
    }, 100);
}



