import {Vinyl} from "./vinyl.js";
import {addBasicElement, addAnchorElement,} from "./html-helper.js";

export function renderVinyl(vinylDataObject, containerElementId, domContext = document){
    const vinyl = new Vinyl(
        vinylDataObject.artist,
        vinylDataObject.title,
        vinylDataObject.label,
        vinylDataObject.genre,
        vinylDataObject.coverArt,
        vinylDataObject.credits,
        vinylDataObject.description,
        vinylDataObject.id,
    );

    const containerElement = domContext.getElementById(containerElementId);

    addBasicElement(containerElement, vinyl.artist, `${vinyl.id}_artist`);
    addBasicElement(containerElement, vinyl.title, `${vinyl.id}_title`);
    if(vinyl.credits !== "") addBasicElement(containerElement, vinyl.credits, `${vinyl.id}_credits`);
    if(vinyl.genre !== "") addBasicElement(containerElement, vinyl.genre, `${vinyl.id}_genre`);
    if(vinyl.description !== "") addBasicElement(containerElement, vinyl.description, `${vinyl.id}_description`);
}

export function renderVinylFormActionsView(containerElementId, onclick, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addAnchorElement(containerElement,"edit", `${vinyl.id}_open`,`edit.html?vinyl-id=${vinyl.id}`);
}