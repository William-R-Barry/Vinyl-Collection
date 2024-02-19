import {addDivElement, addActionButtonElement, addHeadingElement,} from "./html-helper.js";
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

function expandVinylLineItem(vinylId){
    alert(vinylId);
}

function renderVinylLineItem(vinylLineItem, containerElementId, className = "lineItem", domContext = document){
    const parentContainerElement = domContext.getElementById(containerElementId);
    const childContainerElement = addDivElement(parentContainerElement, {id: `${vinylLineItem.id}_line_item`, className: className});

    addHeadingElement(childContainerElement, {content: vinylLineItem.title, className: "lineItem title"});
    addDivElement(childContainerElement, {content: vinylLineItem.artist, className: "lineItem artist"});
    if(vinylLineItem.genre !== ""){
        addDivElement(childContainerElement, {content: vinylLineItem.genre, className: "lineItem genre"});
    }
    
    addActionButtonElement(childContainerElement, {
        buttonClassName: "lineItem button",
        content: "open",
        elementId: `${vinylLineItem.id}_open`,
        href: `./view.html?vinyl-id=${vinylLineItem.id}`,
    });
}