import {ERROR} from "./codes.js";

export function fetchVinylById(id){
    if(id === undefined || id === "") throw ERROR.no_id_specified;

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
    })
    const dataObject = JSON.parse(json);

    return dataObject;
}

export function fetchVinylLineItemsByFilter(filter){
    let requestSuccessful = true;

    if(!requestSuccessful){ throw ERROR.request_failed; }

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
    const dataArray = JSON.parse(json);

    return dataArray;
}

const API_PARAMETERS = {
    url: "",
    port: "",
}

function apiRequest(action,resource,queryParameters){
    switch(action.toLowerCase()){
        case "get":
            console.log(`GET api request: ${resource} - ${queryParameters}`);
            break;
        case "post":
            console.log(`POST api request: ${resource} - ${queryParameters}`);
            break;
        case "put":
            console.log(`PUT api request: ${resource} - ${queryParameters}`);
            break;
        default:
            throw "ERROR: Uknown request action!";
    }
}