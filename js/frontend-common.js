import {Vinyl,} from "./vinyl.js";
import {addFormElement, addFormInputElement, createFormElementId} from "./html-helper.js";
import {
    fetchVinylById as apiFetchVinylById,
    sendCreateVinylRequest as apiSendCreateVinyl,
    sendUpdateVinylRequest as apiSendUpdateVinyl,
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

export function getVinlyId(){
    const urlParams = new URLSearchParams(window.location.search);

    if(!urlParams.has("vinyl-id")){ throw ERROR.REQUEST.NO_ID_SPECIFIED; }

    return urlParams.get("vinyl-id");
}

export function renderVinylForm(vinylDataObject, containerElementId, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);
    const formActionURL = "";

    const formElement = addFormElement(containerElement, "post", formActionURL, createFormElementId("vinyl", "form", vinylDataObject.id));

    for(let i in FORM.VINYL){
        addFormInputElement(
            formElement,
            vinylDataObject[FORM.VINYL[i].KEY],
            FORM.VINYL[i].PLACE_HOLDER,
            FORM.VINYL[i].KEY,
            createFormElementId(FORM.VINYL[i].KEY, FORM.VINYL[i].ELEMENT_TYPE, vinylDataObject.id));
    }
}

export function getVinylFormValues(originalVinylDataObject, domContext = document){
    let vinylDataObject = new Vinyl();

    for(let i in FORM.VINYL){
        vinylDataObject[FORM.VINYL[i].KEY] = domContext.getElementById(createFormElementId(FORM.VINYL[i].KEY, FORM.VINYL[i].ELEMENT_TYPE, originalVinylDataObject.id)).value;
    }

    return vinylDataObject;
}

export function sendCreateVinyl(vinylDataObject){
    return apiSendCreateVinyl(vinylDataObject);
}

export function sendUpdateVinyl(vinylDataObject){
    return apiSendUpdateVinyl(vinylDataObject);
}

export function displaySuccessMessage(message){
    displayMessage(`Success: ${message}.`);
}

export function displayErrorMessage(message){
    displayMessage(`Error: ${message}!`);
}

function displayMessage(message){
    alert(message);
}

export function logError(error){
    console.log(error);
}