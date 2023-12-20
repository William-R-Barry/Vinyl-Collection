import {ERROR} from "./codes.js";

const API_PARAMETERS = {
    url: "",
    port: "",
}

export function fetchVinylById(id){
    const url = "http://localhost:8080/Vinyl collection/www/public/test-data/vinyl-record.json";
    
    return apiRequestGet(url);
}

export function fetchVinylLineItemsByFilter(filter){
    const url = "http://localhost:8080/Vinyl collection/www/public/test-data/vinyl-line-item-set.json";

    return apiRequestGet(url);
};

export function sendCreateVinylRequest(dataObject){
    logAPIAction("Send POST request");
    logAPIAction(dataObject);

    dataObject.id = "01";

    return new Promise((resolve, reject) => {
        if(dataObject === undefined){
            reject(new Error("POST request failed!"));
        }

        setTimeout(function(dataObject){resolve(dataObject);},2500,dataObject);
    });
}

export function sendUpdateVinylRequest(dataObject){
    logAPIAction("Send PUT request");
    logAPIAction(dataObject);

    return new Promise((resolve, reject) => {
        if(dataObject === undefined){
            reject(new Error("PUT request failed!"));
        }

        setTimeout(function(dataObject){resolve(dataObject);},2500,dataObject);
    });
}

function apiRequestGet(url){
    return fetch(url,{method:"GET"})
        .then(response => {
            if(!response.ok){
                logAPIError(response);

                throw ERROR.RESPONSE.RESPONSE_NOT_OK.CODE;
            }
            if(response.headers.get("content-type") !== "application/json"){
                logAPIError(response);
                
                throw ERROR.RESPONSE.UNEXPECTED_CONTENT_TYPE.CODE;
            }
            return response.json(); // note: the fetch json method resolves to a JavaScript object not JSON.
        })
        .catch(error => {
            logAPIError(error);

            return error;
        });
}

function apiRequestPost(ur, dataObjectl){
    return fetch(url,{method:"POST", body: dataObjectl})
        .then(response => {
            if(!response.ok){
                logAPIError(response);

                throw ERROR.RESPONSE.RESPONSE_NOT_OK.CODE;
            }
            if(response.headers.get("content-type") !== "application/json"){
                logAPIError(response);
                
                throw ERROR.RESPONSE.UNEXPECTED_CONTENT_TYPE.CODE;
            }
            return response.json(); // note: the fetch json method resolves to a JavaScript object not JSON.
        })
        .catch(error => {
            logAPIError(error);

            return error;
        });
}

function apiRequestPut(url){
    return fetch(url,{method:"PUT", body: dataObjectl})
        .then(response => {
            if(!response.ok){
                logAPIError(response);

                throw ERROR.RESPONSE.RESPONSE_NOT_OK.CODE;
            }
            if(response.headers.get("content-type") !== "application/json"){
                logAPIError(response);
                
                throw ERROR.RESPONSE.UNEXPECTED_CONTENT_TYPE.CODE;
            }
            return response.ok;
        })
        .catch(error => {
            logAPIError(error);

            return error;
        });
}

function logAPIAction(error){
    console.log(error);
}

function logAPIError(error){
    console.log(error);
}