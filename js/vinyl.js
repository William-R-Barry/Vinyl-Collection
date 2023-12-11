import {addBasicElement, addAnchorElement, addFormElement, addFormInputElement, } from "./html-helper.js";

const DEFAULT_ID = "_new_vinyl";
const FORM_PLACE_HOLDER = {
    artist: "Artist",
    title: "Title of record",
    label: "Responsible record label or self released",
    genre: "Genre of record",
    coverArt: "Cover art for record",
    credits: "Credits for contributors to the record",
    description: "Verbose description of the record",
}

export class Vinyl{
    constructor(artist, title, label, genre, coverArt, credits, description, id){
        this.artist = (artist !== undefined) ? artist : "";
        this.title = (title !== undefined) ? title : "";
        this.label = (label !== undefined) ? label : "";
        this.genre = (genre !== undefined) ? genre : "";
        this.coverArt = (coverArt !== undefined) ? coverArt : "";
        this.credits = (credits !== undefined) ? credits : "";
        this.description = (description !== undefined) ? description : "";
        this.id = (id !== undefined) ? title : DEFAULT_ID;
    };
    // properties
    id = "";
    artist = "";
    title = "";
    label = "";
    genre = "";
    coverArt = "";
    credits = "";
    description = "";
    // methods
    validate = function(){
        const requireFieldsComplete = (
            (this.title !== "" && this.title !== undefined)
            && (this.artist !== "" && this.artist !== undefined)
            && (this.genre !== "" && this.genre !== undefined)
        );

        return (requireFieldsComplete);
    };
    renderDisplay = function(elementId, domContext = document){
        const container = domContext.getElementById(elementId);

        addBasicElement.call(container, this.artist, `${this.id}_artist`);
        addBasicElement.call(container, this.title, `${this.id}_title`);
        if(this.credits !== "") addBasicElement.call(container, this.credits, `${this.id}_credits`);
        if(this.genre !== "") addBasicElement.call(container, this.genre, `${this.id}_genre`);
        if(this.description !== "") addBasicElement.call(container, this.description, `${this.id}_description`);
        addAnchorElement.call(container,"edit", `${this.id}_open`,`edit.html?vinyl-id=${this.id}`)

    };
    renderForm = function(elementId, domContext = document){
        const container = domContext.getElementById(elementId);
        const formActionURL = "";

        const formElement = addFormElement.call(container, "post", formActionURL, `${this.id}_form`);

        addFormInputElement.call(formElement,this.artist, FORM_PLACE_HOLDER.artist, "artist", `${this.id}_artist_ti`);
        addFormInputElement.call(formElement,this.title, FORM_PLACE_HOLDER.title, "title", `${this.id}_title_ti`);
        addFormInputElement.call(formElement,this.credits, FORM_PLACE_HOLDER.credits, "credits", `${this.id}_credits_ti`);
        addFormInputElement.call(formElement,this.genre, FORM_PLACE_HOLDER.credits, "genre", `${this.id}_genre_ti`);
        addFormInputElement.call(formElement,this.description, FORM_PLACE_HOLDER.credits, "description", `${this.id}_description_ti`);

    };
};

export class VinylLineItem{
    constructor(id, artist, title, label, genre){
        this.id = (id !== undefined) ? id : DEFAULT_ID;
        this.artist = (artist !== undefined) ? artist : "";
        this.title = (title !== undefined) ? title : "";
        this.label = (label !== undefined) ? label : "";
        this.genre = (genre !== undefined) ? genre : "";
    };
    // properties
    id = "";
    artist = "";
    title = "";
    label = "";
    genre = "";
    // methods
    render = function(elementId, domContext = document){
        const parentContainer = domContext.getElementById(elementId);
        const childContainer = addBasicElement.call(parentContainer, "", `${this.id}_line_item`);

        addBasicElement.call(childContainer, this.artist, `${this.id}_artist`,"span");
        addBasicElement.call(childContainer, this.title, `${this.id}_title`,"span");
        if(this.genre !== "") addBasicElement.call(childContainer, this.genre, `${this.id}_genre`,"span");
        addAnchorElement.call(childContainer, "open", `${this.id}_open`,`view.html?vinyl-id=${this.id}`);
    }
};