import {ERROR, API} from "./codes.js";
import { Vinyl, VinylLineItem } from "./vinyl.js";

const API_PARAMETERS = {
    URL: "127.0.0.1",
    PORT: "8124",
}

export function fetchVinylById(id){
    const url = `${apiGetBaseURL()}/${id}`;
    
    return apiRequestGet(url).then(vinylJSON => {
        return new Vinyl(vinylJSON);
    });
}

export function fetchVinylLineItemsByFilter(filter){
    let url = apiGetBaseURL();
    let queryString = "";

    for(let key in filter){
        if(queryString.length>0) queryString += `&${key}=${filter[key]}`;
        else queryString += `${key}=${filter[key]}`;
    }

    if(queryString.length>0) url += `?${queryString}`;

    return apiRequestGet(url).then(vinyLineItemsJSON => {
        let vinyLineItems = [];

        for(let vinyLineItemJSON of vinyLineItemsJSON){
            vinyLineItems.push(new VinylLineItem(
                vinyLineItemJSON.id,
                vinyLineItemJSON.artist,
                vinyLineItemJSON.title,
                vinyLineItemJSON.label,
                vinyLineItemJSON.genre,
            ));
        }

        return vinyLineItems;
    });
}

export function sendCreateVinylRequest(vinyl){
    let url = apiGetBaseURL();
    logAction("Send POST request");
    logAction(vinyl);

    return apiRequestPost(url, vinyl.toJSON());
}

export function sendUpdateVinylRequest(vinyl){
    const url = `${apiGetBaseURL()}/${vinyl.id}`;
    logAction("Send PUT request");
    logAction(vinyl);

    return apiRequestPut(url, vinyl.toJSON());
}

function apiGetBaseURL(){
    return `http://${API_PARAMETERS.URL}:${API_PARAMETERS.PORT}/`;
}

function apiRequestGet(url){
    return fetch(url, {method: "GET"})
        .then(response => {
            if(!response.ok){
                logError(response);

                throw new Error(ERROR.RESPONSE.RESPONSE_NOT_OK.CODE);
            }
            if(response.headers.get("content-type") !== "application/json"){
                logError(response);
                
                throw new Error(ERROR.RESPONSE.UNEXPECTED_CONTENT_TYPE.CODE);
            }

            return response.json(); // note: the fetch json method resolves to a JavaScript object not JSON.;
        })
        .then(reponseObject => {
            if(reponseObject.status.code === API.ERROR.INVALID_REQUEST.CODE){
                throw new Error(ERROR.RESPONSE.INVALID_REQUEST.CODE);
            }
            if(reponseObject.status.code === API.ERROR.NO_RECORD_FOUND.CODE){
                throw new Error(ERROR.RESPONSE.NO_ID_MATCHED.CODE);
            }

            return reponseObject.data;
        })
        .catch(error => {
            logError(error);

            throw error;
        });
}

function apiRequestPost(url, requestJSON){
    return fetch(url,{method: "POST", body: requestJSON})
        .then(response => {
            if(!response.ok){
                throw new Error(ERROR.RESPONSE.RESPONSE_NOT_OK.CODE);
            }
            if(response.headers.get("content-type") !== "application/json"){
                throw new Error(ERROR.RESPONSE.UNEXPECTED_CONTENT_TYPE.CODE);
            }

            return response.json(); // note: the fetch response json method resolves to a JavaScript object not JSON.
        })
        .then(reponseObject => {
            if(reponseObject.status.code === API.ERROR.INVALID_REQUEST.CODE){
                throw new Error(ERROR.RESPONSE.INVALID_REQUEST.CODE);
            }

            return reponseObject.data;
        })
        .catch(error => {
            logError(error);

            throw error;
        });
}

function apiRequestPut(url, requestJSON){
    return fetch(url,{method: "PUT", body: requestJSON})
    .then(response => {
        if(!response.ok){
            throw new Error(ERROR.RESPONSE.RESPONSE_NOT_OK.CODE);
        }
        if(response.headers.get("content-type") !== "application/json"){
            throw new Error(ERROR.RESPONSE.UNEXPECTED_CONTENT_TYPE.CODE);
        }

        return response.json(); // note: the fetch response json method resolves to a JavaScript object not JSON.
    })
    .then(reponseObject => {
        if(reponseObject.status.code === API.ERROR.INVALID_REQUEST.CODE){
            throw new Error(ERROR.RESPONSE.INVALID_REQUEST.CODE);
        }

        return reponseObject.data;
    })
    .catch(error => {
        logError(error);

        throw error;
    });
}

function logAction(error){
    console.log(error);
}

function logError(error){
    console.log(error);
}