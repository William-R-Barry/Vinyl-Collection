import {Vinyl, VinylLineItem,} from "./vinyl.js";
import {addBasicElement, addAnchorElement, addFormElement, addFormInputElement} from "./html-helper.js";
import {
    fetchVinylById as apiFetchVinylById,
    fetchVinylLineItemsByFilter as apiFetchVinylLineItemsByFilter,
} from "./api-bridge.js";

const FORM_PLACE_HOLDER = {
    artist: "Artist",
    title: "Title of record",
    label: "Responsible record label or self released",
    genre: "Genre of record",
    coverArt: "Cover art for record",
    credits: "Credits for contributors to the record",
    description: "Verbose description of the record",
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


export function renderVinyl(vinylDataObject, parentElement, domContext = document){
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

    const container = domContext.getElementById(parentElement);

    addBasicElement.call(container, vinyl.artist, `${vinyl.id}_artist`);
    addBasicElement.call(container, vinyl.title, `${vinyl.id}_title`);
    if(vinyl.credits !== "") addBasicElement.call(container, vinyl.credits, `${vinyl.id}_credits`);
    if(vinyl.genre !== "") addBasicElement.call(container, vinyl.genre, `${vinyl.id}_genre`);
    if(vinyl.description !== "") addBasicElement.call(container, vinyl.description, `${vinyl.id}_description`);
    addAnchorElement.call(container,"edit", `${vinyl.id}_open`,`edit.html?vinyl-id=${vinyl.id}`);
}

export function renderVinylForm(vinylDataObject, parentElement, domContext = document){
    const container = domContext.getElementById(parentElement);
    const formActionURL = "";

    const formElement = addFormElement.call(container, "post", formActionURL, `${vinylDataObject.id}_form`);

    addFormInputElement.call(formElement,vinylDataObject.artist, FORM_PLACE_HOLDER.artist, "artist", `${vinylDataObject.id}_artist_ti`);
    addFormInputElement.call(formElement,vinylDataObject.title, FORM_PLACE_HOLDER.title, "title", `${vinylDataObject.id}_title_ti`);
    addFormInputElement.call(formElement,vinylDataObject.credits, FORM_PLACE_HOLDER.credits, "credits", `${vinylDataObject.id}_credits_ti`);
    addFormInputElement.call(formElement,vinylDataObject.genre, FORM_PLACE_HOLDER.credits, "genre", `${vinylDataObject.id}_genre_ti`);
    addFormInputElement.call(formElement,vinylDataObject.description, FORM_PLACE_HOLDER.credits, "description", `${vinylDataObject.id}_description_ti`);
}

export function renderVinylLineItems(vinylDataObjects, parentElement){
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
            renderVinylLineItem(vinylLineItem, parentElement);
        }
    }
    else{
        alert("Sorry, no vinyl match you filter.");
    }
}

export function renderVinylLineItem(vinylLineItem, elementId, domContext = document){
    const parentContainer = domContext.getElementById(elementId);
    const childContainer = addBasicElement.call(parentContainer, "", `${vinylLineItem.id}_line_item`);

    addBasicElement.call(childContainer, vinylLineItem.artist, `${vinylLineItem.id}_artist`,"span");
    addBasicElement.call(childContainer, vinylLineItem.title, `${vinylLineItem.id}_title`,"span");
    if(vinylLineItem.genre !== "") addBasicElement.call(childContainer, vinylLineItem.genre, `${vinylLineItem.id}_genre`,"span");
    addAnchorElement.call(childContainer, "open", `${vinylLineItem.id}_open`,`view.html?vinyl-id=${vinylLineItem.id}`);
}