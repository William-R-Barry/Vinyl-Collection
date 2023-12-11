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

export function addFormElement(method, action, formId, domContext = document){
    let formElement = domContext.createElement("form");
    formElement.setAttribute("method", method);
    formElement.setAttribute("action", action);

    this.appendChild(formElement);

    return formElement;
}

export function addFormInputElement(content, placeHolder, elementName, elementId, domContext = document){
    let formInputElement = domContext.createElement("input");
    
    formInputElement.setAttribute("value", content);
    formInputElement.setAttribute("type", "text");
    formInputElement.setAttribute("name", elementName);
    formInputElement.setAttribute("placeholder", placeHolder);

    this.appendChild(formInputElement);

    return formInputElement;
 
};