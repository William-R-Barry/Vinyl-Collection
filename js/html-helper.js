export function addBasicElement(content, elementId, elementType = "div", domContext = document){
    let element = domContext.createElement(elementType);
    element.innerHTML = content;
    element.id = elementId;

    this.appendChild(element);

    return element;
};

export function addAnchorElement(content, elementId, href, onclick, domContext = document){
    let element = domContext.createElement("a");
    element.innerHTML = content;
    element.id = elementId;
    element.href = href;
    if(onclick !== undefined || onclick !== "") { element.onclick = onclick; }

    this.appendChild(element);

    return element;
};