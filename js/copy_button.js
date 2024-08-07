

export function addClickListener(element = null, fn = null) {
    if (element && fn) {
        element.addEventListener('click', fn);
    }
}

export function copy(element=null){
    let cad = "";
    if(element){
        if(element.tagName.toLowerCase() ==="input" || element.tagName.toLowerCase() === "textarea"){
            cad = getTextFromInput(element);
        }else{
            cad =element.textContent || element.innerText;
        }
        cad = cad.trim();
        if (cad!==null){
            if(navigator.clipboard){
                navigator.clipboard.writeText(cad);
            }else{
                document.execCommand('copy');
            }
            
        }
        
    }
}

const string_copy_symbol = "content_copy";
const string_task_alt = "task_alt";

export function animationCopied(span=null){
    return new Promise((resolve)=>{
        if(span){
            span.style.transform = "rotate(-180deg)";
            span.innerText = string_task_alt;
            setTimeout(() => {
                span.style.transform = "rotate(180deg)";
                span.innerText = string_copy_symbol;
                resolve();
            }, 2000);
        }else resolve();
    });
}

function getTextFromInput(element=null){
    
    if(element){
        const max = element.value.length;
        element.select();
        element.setSelectionRange(0, max);
        return element.value;
    }
    return null;
}