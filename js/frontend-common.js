import {Vinyl,} from "./vinyl.js";
import {addFormElement, addFormInputElement, createFormElementId, addBrElement} from "./html-helper.js";
import {
    fetchVinylById as apiFetchVinylById,
    sendCreateVinylRequest as apiSendCreateVinyl,
    sendUpdateVinylRequest as apiSendUpdateVinyl,
} from "./api-bridge.js";
import {ERROR,} from "./codes.js";

const FORM = {
    VINYL: [
        {
            KEY: "title",
            PLACE_HOLDER: "Title of record",
            ELEMENT_TYPE: "textInput",
        },
        {
            KEY: "artist",
            PLACE_HOLDER: "Name of artist",
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
            KEY: "description",
            PLACE_HOLDER: "Verbose description of the record",
            ELEMENT_TYPE: "textInput",
        },
        {
            KEY: "credits",
            PLACE_HOLDER: "Credits for contributors to the record",
            ELEMENT_TYPE: "textInput",
        },
        {
            KEY: "label",
            PLACE_HOLDER: "Responsible record label or self released",
            ELEMENT_TYPE: "textInput",
        },         
    ],
};

export function fetchVinylById(id){
    return apiFetchVinylById(id); 
}

export function getVinlyId(){
    const urlParams = new URLSearchParams(window.location.search);

    if(!urlParams.has("vinyl-id")){ throw new Error(ERROR.REQUEST.NO_ID_SPECIFIED.CODE); }

    return urlParams.get("vinyl-id");
}

export function renderVinylForm(vinyl, containerElementId, domContext = document){
    const containerElement = domContext.getElementById(containerElementId);
    const formActionURL = "";

    const formElement = addFormElement(containerElement, "post", formActionURL, createFormElementId("vinyl", "form", vinyl.id));

    for(let i in FORM.VINYL){
        addFormInputElement(
            formElement,
            {
                content: vinyl[FORM.VINYL[i].KEY],
                elementSize: 50,
                elementName: FORM.VINYL[i].KEY,
                elementId: createFormElementId(FORM.VINYL[i].KEY, FORM.VINYL[i].ELEMENT_TYPE, vinyl.id),
                placeHolder: FORM.VINYL[i].PLACE_HOLDER,
            }
        );
        addBrElement(formElement);
    }
}

export function getVinylFormValues(originalVinyl, domContext = document){
    let vinyl = new Vinyl();

    for(let i in FORM.VINYL){
        vinyl[FORM.VINYL[i].KEY] = domContext.getElementById(createFormElementId(FORM.VINYL[i].KEY, FORM.VINYL[i].ELEMENT_TYPE, originalVinyl.id)).value;
    }

    return vinyl;
}

export function sendCreateVinyl(vinyl){
    return apiSendCreateVinyl(vinyl);
}

export function sendUpdateVinyl(vinyl){
    return apiSendUpdateVinyl(vinyl);
}

export function displaySuccessMessage(message){
    displayMessage(`Success: ${message}.`);
}

export function displayInformationMessage(message){
    displayMessage(`Information: ${message}.`);
}

export function displayWarningMessage(message){
    displayMessage(`Warning: ${message}.`);
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