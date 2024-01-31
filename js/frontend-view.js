import {addBasicElement, addAnchorElement,} from "./html-helper.js";

export function renderVinyl(vinyl, containerElementId, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addBasicElement(containerElement, vinyl.artist, `${vinyl.id}_artist`);
    addBasicElement(containerElement, vinyl.title, `${vinyl.id}_title`);
    if(vinyl.credits !== "") addBasicElement(containerElement, vinyl.credits, `${vinyl.id}_credits`);
    if(vinyl.genre !== "") addBasicElement(containerElement, vinyl.genre, `${vinyl.id}_genre`);
    if(vinyl.description !== "") addBasicElement(containerElement, vinyl.description, `${vinyl.id}_description`);
}

export function renderVinylFormActionsView(vinyl, containerElementId, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addAnchorElement(containerElement,"update", `${vinyl.id}_open`,`update.html?vinyl-id=${vinyl.id}`);
}