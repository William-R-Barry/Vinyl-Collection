import {Vinyl, VinylLineItem,} from "./vinyl.js";
import {addBasicElement, addAnchorElement, addFormElement, addFormInputElement, createFormElementId} from "./html-helper.js";
import {
    fetchVinylById as apiFetchVinylById,
    fetchVinylLineItemsByFilter as apiFetchVinylLineItemsByFilter,
} from "./api-bridge.js";

const FORM = {
    VINYL: [
        {
            KEY: "artist",
            PLACE_HOLDER: "Name of artist",
            ELEMENT_TYPE: "textInput",
        },
        {
            KEY: "title",
            PLACE_HOLDER: "Title of record",
            ELEMENT_TYPE: "textInput",
        },
        {
            KEY: "label",
            PLACE_HOLDER: "Responsible record label or self released",
            ELEMENT_TYPE: "textInput",
        },
        {
            KEY: "genre",
            PLACE_HOLDER: "Genre of record",
            ELEMENT_TYPE: "textInput",
        },
        /*{
            KEY: "coverArt",
            PLACE_HOLDER: "Cover art for record",
            ELEMENT_TYPE: "image",
        },*/
        {
            KEY: "credits",
            PLACE_HOLDER: "Credits for contributors to the record",
            ELEMENT_TYPE: "textInput",
        },
        {
            KEY: "description",
            PLACE_HOLDER: "Verbose description of the record",
            ELEMENT_TYPE: "textInput",
        }, 
    ],
};


export function fetchVinylById(id){
    return apiFetchVinylById(id); 
}

export function fetchVinylsByFilter(filter){
    return apiFetchVinylLineItemsByFilter(filter);
}

export function getVinlyId(){
    const urlParams = new URLSearchParams(window.location.search);

    if(!urlParams.has("vinyl-id")){ throw ERROR.REQUEST.no_id_specified; }

    return urlParams.get("vinyl-id");
}


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

    const container = domContext.getElementById(containerElementId);

    addBasicElement(container, vinyl.artist, `${vinyl.id}_artist`);
    addBasicElement(container, vinyl.title, `${vinyl.id}_title`);
    if(vinyl.credits !== "") addBasicElement(container, vinyl.credits, `${vinyl.id}_credits`);
    if(vinyl.genre !== "") addBasicElement(container, vinyl.genre, `${vinyl.id}_genre`);
    if(vinyl.description !== "") addBasicElement(container, vinyl.description, `${vinyl.id}_description`);
    addAnchorElement(container,"edit", `${vinyl.id}_open`,`edit.html?vinyl-id=${vinyl.id}`);
}

export function renderVinylForm(vinylDataObject, containerElementId, domContext = document){
    const container = domContext.getElementById(containerElementId);
    const formActionURL = "";

    const formElement = addFormElement(container, "post", formActionURL, createFormElementId("vinyl", "form", vinylDataObject.id));

    for(let i in FORM.VINYL){
        addFormInputElement(
            formElement,
            vinylDataObject[FORM.VINYL[i].KEY],
            FORM.VINYL[i].PLACE_HOLDER,
            FORM.VINYL[i].KEY,
            createFormElementId(FORM.VINYL[i].KEY, FORM.VINYL[i].ELEMENT_TYPE, vinylDataObject.id));
    }
}

export function getVinylFormValues(vinylDataObject, domContext = document){
    for(let i in FORM.VINYL){
        console.log(domContext.getElementById(createFormElementId(FORM.VINYL[i].KEY, FORM.VINYL[i].ELEMENT_TYPE, vinylDataObject.id)).value);
    }

}

export function renderVinylFormActionsNew(containerElementId, vinylFormId, onclick, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addAnchorElement(containerElement, "save", `${vinylFormId}_save`, "javascript:void(0);", onclick);
}

export function renderVinylFormActionsEdit(containerElementId, vinylFormId, onclick, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);

    addAnchorElement(containerElement, "save", `${vinylFormId}_save`, "javascript:void(0);", onclick);
}

export function renderVinylLineItems(vinylDataObjects, containerElementId){
    let vinylLineItems = [];

    for(let vinylDataObject of vinylDataObjects){
        vinylLineItems.push(new VinylLineItem(
            vinylDataObject.id,
            vinylDataObject.artist,
            vinylDataObject.title,
            vinylDataObject.label,
            vinylDataObject.genre,
        ));
    }

    if(vinylLineItems.length > 0){
        for(let vinylLineItem of vinylLineItems){
            renderVinylLineItem(vinylLineItem, containerElementId);
        }
    }
    else{
        alert("Sorry, no vinyl match you filter.");
    }
}

export function renderVinylLineItem(vinylLineItem, containerElementId, domContext = document){
    const parentContainer = domContext.getElementById(containerElementId);
    const childContainer = addBasicElement(parentContainer, "", `${vinylLineItem.id}_line_item`);

    addBasicElement(childContainer, vinylLineItem.artist, `${vinylLineItem.id}_artist`,"span");
    addBasicElement(childContainer, vinylLineItem.title, `${vinylLineItem.id}_title`,"span");
    if(vinylLineItem.genre !== "") addBasicElement(childContainer, vinylLineItem.genre, `${vinylLineItem.id}_genre`,"span");
    addAnchorElement(childContainer, "open", `${vinylLineItem.id}_open`,`view.html?vinyl-id=${vinylLineItem.id}`);
}