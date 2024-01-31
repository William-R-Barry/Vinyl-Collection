const DEFAULT_ID = "_new_vinyl";

export class Vinyl{
    constructor(artist, title, label, genre, coverArt, credits, description, purchasePrice, id){
        this.artist = (artist !== undefined) ? artist : "";
        this.title = (title !== undefined) ? title : "";
        this.label = (label !== undefined) ? label : "";
        this.genre = (genre !== undefined) ? genre : "";
        this.coverArt = (coverArt !== undefined) ? coverArt : "";
        this.credits = (credits !== undefined) ? credits : "";
        this.description = (description !== undefined) ? description : "";
        this.purchasePrice = (purchasePrice !== undefined) ? purchasePrice : 0;
        this.#id = (id !== undefined) ? id : DEFAULT_ID;
    }
    // public properties
    artist
    title
    label
    genre
    coverArt
    credits
    description
    purchasePrice
    // private properties
    #id
    #currentAverageMarketValue // - ( idea from Albert ) - web crawler retrieved value e.g. discogs etc. Could be called periodiclly or on demand.
    // getters anbd setters
    get id(){
        return this.#id;
    }
    get currentAverageMarketValue(){
        return this.#currentAverageMarketValue;
    }
    // public methods
    validate(){
        const requireFieldsComplete = (
            (this.title !== "" && this.title !== undefined)
            && (this.artist !== "" && this.artist !== undefined)
            && (this.genre !== "" && this.genre !== undefined)
        );

        return (requireFieldsComplete);
    }
    toJSON(){
        return JSON.stringify({
            artist: this.artist,
            title: this.title,
            label: this.label,
            genre: this.genre,
            coverArt: this.coverArt,
            credits: this.credits,
            description: this.description,
            purchasePrice: this.purchasePrice,
            id: this.#id,
        });
    }
}

export class VinylLineItem{
    constructor(id, artist, title, label, genre){
        this.#id = (id !== undefined) ? id : DEFAULT_ID;
        this.#artist = (artist !== undefined) ? artist : "";
        this.#title = (title !== undefined) ? title : "";
        this.#label = (label !== undefined) ? label : "";
        this.#genre = (genre !== undefined) ? genre : "";
    }
    // private properties
    #id
    #artist
    #title
    #label
    #genre
    // getters and setters
    get id(){
        return this.#id;
    }
    get artist(){
        return this.#artist;
    }
    get title(){
        return this.#title;
    }
    get label(){
        return this.#label;
    }
    get genre(){
        return this.#genre;
    }
}