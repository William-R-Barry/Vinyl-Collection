import {addDivElement, addActionButtonElement, addHeadingElement,} from "./html-helper.js";

export function renderVinyl(vinyl, containerElementId, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addHeadingElement(containerElement, {content: vinyl.title, className: "vinyl view title"});
    addDivElement(containerElement, {content: vinyl.artist, className: "vinyl view artist"});
    if(vinyl.genre !== "") addDivElement(containerElement, {content: vinyl.genre, className: "vinyl view genre"});
    if(vinyl.description !== "") addDivElement(containerElement, {content: vinyl.description, className: "vinyl view description"});
    if(vinyl.credits !== "") addDivElement(containerElement, {content: vinyl.credits, className: "vinyl view credits"});
    if(vinyl.label !== "")addDivElement(containerElement, {content: vinyl.labeld, className: "vinyl view label"});
}

export function renderVinylFormActionsView(vinyl, containerElementId, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addActionButtonElement(containerElement, {
        buttonClassName: "vinyl button",
        content: "update",
        elementId: `${vinyl.id}_open`,
        href: `update.html?vinyl-id=${vinyl.id}`,
    });
}