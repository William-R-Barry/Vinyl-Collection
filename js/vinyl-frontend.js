import {Vinyl, VinylLineItem,} from "./vinyl.js";
import {
    fetchVinylById as apiFetchVinylById,
    fetchVinylLineItemsByFilter as apiFetchVinylLineItemsByFilter,
} from "./api-bridge.js";

export function fetchVinylById(id){
    const vinylDataObject = apiFetchVinylById(id);

    return new Vinyl(
        vinylDataObject.artist,
        vinylDataObject.title,
        vinylDataObject.label,
        vinylDataObject.genre,
        vinylDataObject.coverArt,
        vinylDataObject.credits,
        vinylDataObject.description,
        vinylDataObject.id,
    );
}

export function fetchVinylsByFilter(filter){
    const vinylDataObjects = apiFetchVinylLineItemsByFilter(filter);
    let lineItems = [];

    for(let vinylDataObject of vinylDataObjects){
        lineItems.push(new VinylLineItem(
            vinylDataObject.id,
            vinylDataObject.artist,
            vinylDataObject.title,
            vinylDataObject.label,
            vinylDataObject.genre,
        ));
    }

    return lineItems;
}

export function getVinlyId(){
    const urlParams = new URLSearchParams(window.location.search);

    if(!urlParams.has("vinyl-id")){ throw ERROR.no_id_specified; }

    return urlParams.get("vinyl-id");
}