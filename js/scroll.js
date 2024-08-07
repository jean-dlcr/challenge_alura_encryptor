
export function handleScroll(links=null, sections=null) {
 
if(links && sections){
    let index = sections.length;
    while (--index && window.scrollY + 300< sections[index].offsetTop);
    links.forEach(link => link.classList.remove('active'));
    if (index >= 0 && index < links.length) {
        links[index].classList.add('active');
    }
}
}

export function addScrollListener(element = null, fn= null){
    if(element && fn){
        element.addEventListener('scroll', fn);
    }
}