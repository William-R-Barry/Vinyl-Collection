import {addAnchorElement,} from "./html-helper.js";

export function renderVinylFormUpdateActions(containerElementId, vinylFormId, onclick, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addAnchorElement(containerElement, "save", `${vinylFormId}_save`, "javascript:void(0);", onclick);
}