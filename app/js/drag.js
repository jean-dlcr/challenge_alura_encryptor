import { makeActive } from "./iconsClick.js";

export function makeDraggable(elementId, headerId) {
    const element = document.getElementById(elementId);
    const header = document.getElementById(headerId);
    const offsetX = { value: 0 };
    const offsetY = { value: 0 };
    const isDragging = { value: false };
    const touchOptions = { passive: false };

    header.addEventListener('mousedown', (e) => onPointerStart(e, element, offsetX, offsetY, isDragging));
    header.addEventListener('touchstart', (e) => onPointerStart(e, element, offsetX, offsetY, isDragging), touchOptions);

    document.addEventListener('mousemove', (e) => onPointerMove(e, element, offsetX, offsetY, isDragging));
    document.addEventListener('touchmove', (e) => onPointerMove(e, element, offsetX, offsetY, isDragging), touchOptions);

    document.addEventListener('touchend', () => onPointerEnd(isDragging), touchOptions);
    document.addEventListener('mouseup', () => onPointerEnd(isDragging));
}

function onPointerStart(e, element, offsetX, offsetY, isDragging) {
    makeActive(element);
    const touch = e.touches ? e.touches[0] : e;
    isDragging.value = true;
    offsetX.value = touch.clientX - element.offsetLeft;
    offsetY.value = touch.clientY - element.offsetTop;
}

function onPointerMove(e, element, offsetX, offsetY, isDragging) {
    if (isDragging.value) {
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        const newY = touch.clientY - offsetY.value;
        if (newY > 0) element.style.top = `${newY}px`;
        element.style.left = `${touch.clientX - offsetX.value}px`;
    }
}

function onPointerEnd(isDragging) {
    isDragging.value = false;
}
