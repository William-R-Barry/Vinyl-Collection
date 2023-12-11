const DEFAULT_ID = "_new_vinyl";

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
}

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
}