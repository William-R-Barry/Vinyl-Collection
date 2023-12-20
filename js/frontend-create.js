import {addAnchorElement,} from "./html-helper.js";

export function renderVinylFormActionsNew(containerElementId, vinylFormId, onclick, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addAnchorElement(containerElement, "save", `${vinylFormId}_save`, "javascript:void(0);", onclick);
}