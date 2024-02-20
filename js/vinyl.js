const DEFAULT_ID = "_new_vinyl";

export class Vinyl{
    constructor(dataObject){
        if(dataObject !== undefined){
            this.#id = (dataObject.id !== undefined) ? dataObject.id : DEFAULT_ID;
            
            this.artist = (dataObject.artist !== undefined) ? dataObject.artist : "";
            this.title = (dataObject.title !== undefined) ? dataObject.title : "";
            this.label = (dataObject.label !== undefined) ? dataObject.label : "";
            this.genre = (dataObject.genre !== undefined) ? dataObject.genre : "";
            this.coverArt = (dataObject.coverArt !== undefined) ? dataObject.coverArt : "";
            this.credits = (dataObject.credits !== undefined) ? dataObject.credits : "";
            this.description = (dataObject.description !== undefined) ? dataObject.description : "";
            this.purchasePrice = (dataObject.purchasePrice !== undefined) ? dataObject.purchasePrice : 0;
        }
        else{
            this.#id = DEFAULT_ID;
        }
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