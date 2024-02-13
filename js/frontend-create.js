import {addActionButtonElement,} from "./html-helper.js";

export function renderVinylFormActionsNew(containerElementId, vinylFormId, onclick, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addActionButtonElement(containerElement, {
        buttonClassName: "vinyl button",
        content: "save",
        elementId: `${vinylFormId}_save`,
        onclick: onclick,
    });
}