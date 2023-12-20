export function addBasicElement(containerElement, content, elementId, elementType = "div", domContext = document){
    let element = domContext.createElement(elementType);
    element.innerHTML = content;
    element.id = elementId;

    containerElement.appendChild(element);

    return element;
}

export function addAnchorElement(containerElement, content, elementId, href, onclick, domContext = document){
    let element = domContext.createElement("a");
    element.innerHTML = content;
    element.id = elementId;
    element.href = href;
    if(onclick !== undefined || onclick !== "") { element.onclick = onclick; }

    containerElement.appendChild(element);

    return element;
}

export function addFormElement(containerElement, method, action, formId, domContext = document){
    let formElement = domContext.createElement("form");
    formElement.setAttribute("method", method);
    formElement.setAttribute("action", action);

    containerElement.appendChild(formElement);

    return formElement;
}

export function createFormElementId(name, elementType, recordId){
    const ELEMENT_PREFIX = {
        form: "form",
        textInput: "ti",
    }

    return `${(recordId !== undefined && recordId !== "") ? recordId+"_" : ""}${name}_${ELEMENT_PREFIX[elementType]}`;
}

export function addFormInputElement(containerElement, content, placeHolder, elementName, elementId, domContext = document){
    let formInputElement = domContext.createElement("input");

    formInputElement.setAttribute("value", content);
    formInputElement.setAttribute("type", "text");
    formInputElement.setAttribute("name", elementName);
    formInputElement.setAttribute("placeholder", placeHolder);
    formInputElement.setAttribute("id", elementId);

    containerElement.appendChild(formInputElement);

    return formInputElement;
 
}