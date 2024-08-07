import { addClickListener, copy, animationCopied } from "./copy_button.js";
import { addScrollListener, handleScroll } from "./scroll.js";

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.remove('no-display');
    const links = document.querySelectorAll('header nav ul li a.color-default-a');
const sections = document.querySelectorAll('section');

addScrollListener(window, ()=> handleScroll(links, sections));
handleScroll(links, sections);

});




const copy_symbols = document.querySelectorAll("button.copy-symbol");

copy_symbols.forEach(element => {
    let codeElement = element.nextElementSibling;
    if(codeElement.tagName.toLowerCase() ==="code"){
        addClickListener(element, ()=>{copy(codeElement); animationCopied(element.querySelector("span"))});
    }
});
