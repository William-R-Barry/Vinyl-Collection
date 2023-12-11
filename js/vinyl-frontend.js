import {Vinyl, VinylLineItem} from "./vinyl.js";

export const ERROR = {
    no_id_specified: "_no_id_specified",
    no_id_matched: "_no_match_found_for_id",
    request_failed: "_request_failed",
};

export function fetchVinylById(id){
    let requestSuccessful = true;
    let recordFound = true;

    if(!requestSuccessful){ throw ERROR.request_failed; }
    if(!recordFound){ throw ERROR.no_id_matched; }

    const json = JSON.stringify({
        artist: "Nick Cave and The Bad Seeds",
        title: "The Good Son",
        label: "Mute",
        genre: "Dark folk",
        coverArt: "",
        credits: "Some credits",
        description: "Some descriptive text...",
    });
    const vinylDataObject = JSON.parse(json);

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
};

export function fetchVinylsByFilter(filter){
    let requestSuccessful = true;

    if(!requestSuccessful){ throw ERROR.request_failed; }

    let lineItems = [];

    const json = JSON.stringify([
        {
            id: "v01",
            artist: "Nick Cave and The Bad Seeds",
            title: "The Good Son",
            label: "Mute",
            genre: "Dark folk",
        },
        {
            id: "v02",
            artist: "PJ Harvey",
            title: "To Bring You My Love",
            label: "Island Records",
            genre: "Dark folk",
        },
        {
            id: "v03",
            artist: "The Cure",
            title: "Disintegration",
            label: "Fiction Records",
            genre: "Goth",
        }
    ]);

    const vinylDataObjects = JSON.parse(json);

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
};

export function getVinlyId(){
    const urlParams = new URLSearchParams(window.location.search);

    if(!urlParams.has("vinyl-id")){ throw ERROR.no_id_specified; }

    return urlParams.get("vinyl-id");
};