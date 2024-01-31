import {addBasicElement, addAnchorElement,} from "./html-helper.js";
import {
    fetchVinylLineItemsByFilter as apiFetchVinylLineItemsByFilter,
} from "./api-bridge.js";

export function fetchVinylsByFilter(filter){
    return apiFetchVinylLineItemsByFilter(filter);
}

export function renderVinylLineItems(vinylLineItems, containerElementId){
    for(let vinylLineItem of vinylLineItems){
        renderVinylLineItem(vinylLineItem, containerElementId);
    }
}

function renderVinylLineItem(vinylLineItem, containerElementId, domContext = document){
    const parentContainerElement = domContext.getElementById(containerElementId);
    const childContainerElement = addBasicElement(parentContainerElement, "", `${vinylLineItem.id}_line_item`);

    addBasicElement(childContainerElement, vinylLineItem.artist, `${vinylLineItem.id}_artist`,"span");
    addBasicElement(childContainerElement, vinylLineItem.title, `${vinylLineItem.id}_title`,"span");
    if(vinylLineItem.genre !== "") addBasicElement(childContainerElement, vinylLineItem.genre, `${vinylLineItem.id}_genre`,"span");
    addAnchorElement(childContainerElement, "open", `${vinylLineItem.id}_open`,`view.html?vinyl-id=${vinylLineItem.id}`);
}