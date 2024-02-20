function addElement(containerElement, elementType, options){
    let content = options.content;
    let elementId = options.elementId;
    let className = options.className;
    let domContext = (options.domContext !== undefined) ? options.domContext : document;

    let element = domContext.createElement(elementType);
    
    if(content !== undefined) element.innerHTML = content;
    if(elementId !== undefined && elementId !== "") element.id = elementId;
    if(className !== undefined && className !== "") element.className = className;

    containerElement.appendChild(element);

    return element;
}

export function addBrElement(containerElement, domContext = document){
    return addElement(containerElement, "br", {content: undefined, elementId: undefined, className: undefined, domContext: domContext});
}

export function addDivElement(containerElement, options){
    return addElement(containerElement, "div", options);
}

export function addSpanElement(containerElement, options){
    return addElement(containerElement, "span", options);
}

export function addHeadingElement(containerElement, options){
    let elementType = (options.headingSize !== undefined && (options.headingSize >= 1 || options.headingSize <= 6)) ? `h${options.headingSize}` : "h1";
    
    return addElement(containerElement, elementType, options);
}

export function addAnchorElement(containerElement, options){
    let content = options.content;
    let elementId = options.elementId;
    let className = options.className;
    let href = options.href;
    let onclick = options.onclick;
    let onclickArgs = options.onclickArgs;
    let domContext = (options.domContext !== undefined) ? options.domContext : document;

    let element = domContext.createElement("a");
    element.innerHTML = content;
    if(elementId !== undefined && elementId !== "") element.id = elementId;
    if(className !== undefined && className !== "") element.className = className;
    if(href !== undefined) element.href = href;
    if(onclick !== undefined || onclick !== ""){
        if(onclickArgs !== undefined) element.onclick = () => { onclick(onclickArgs); };
        else element.onclick = onclick;
    }

    containerElement.appendChild(element);

    return element;
}

export function addTextElement(containerElement, text, domContext = document){
    let element = domContext.createTextNode(text);
    element.innerHTML = text;

    containerElement.appendChild(element);   
}

export function addActionButtonElement(containerElement, options){
    let content = options.content;
    let elementId = options.elementId;
    let buttonClassName = options.buttonClassName;
    let linkClassName = options.linkClassName;
    let href = options.href;
    let onclick = options.onclick;
    let onclickArgs = options.onclickArgs;
    let domContext = (options.domContext !== undefined) ? options.domContext : document;

    let element = addDivElement(containerElement, {elementId: elementId, className: buttonClassName, domContext: domContext});
    addAnchorElement(element, {content: content, href: href, className: linkClassName, onclick: onclick, onclickArgs: onclickArgs, domContext});

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

export function addFormInputElement(containerElement, options){
    let content = options.content;
    let elementSize = options.elementSize;
    let elementName = options.elementName;
    let elementId = options.elementId;
    let placeHolder = options.placeHolder;
    let domContext = (options.domContext !== undefined) ? options.domContext : document;

    let formInputElement = domContext.createElement("input");

    formInputElement.setAttribute("type", "text");
    if(content !== undefined) formInputElement.setAttribute("value", content);
    if(elementSize !== undefined) formInputElement.setAttribute("size", elementSize);
    if(elementName !== undefined) formInputElement.setAttribute("name", elementName);
    if(placeHolder !== undefined) formInputElement.setAttribute("placeholder", placeHolder);
    if(elementId !== undefined) formInputElement.setAttribute("id", elementId);

    containerElement.appendChild(formInputElement);

    return formInputElement;
 
}

export function addFormHiddenInputElement(containerElement, options){
    let content = options.content;
    let elementSize = options.elementSize;
    let elementName = options.elementName;
    let elementId = options.elementId;
    let domContext = (options.domContext !== undefined) ? options.domContext : document;

    let formInputElement = domContext.createElement("input");

    formInputElement.setAttribute("type", "hidden");
    if(content !== undefined) formInputElement.setAttribute("value", content);
    if(elementSize !== undefined) formInputElement.setAttribute("size", elementSize);
    if(elementName !== undefined) formInputElement.setAttribute("name", elementName);
    if(elementId !== undefined) formInputElement.setAttribute("id", elementId);

    containerElement.appendChild(formInputElement);

    return formInputElement;
 
}

export function createFormElementId(name, elementType, recordId){
    const ELEMENT_PREFIX = {
        form: "form",
        textInput: "ti",
    }

    return `${(recordId !== undefined && recordId !== "") ? recordId+"_" : ""}${name}_${ELEMENT_PREFIX[elementType]}`;
}