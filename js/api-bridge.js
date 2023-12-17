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

function apiRequestGet(url){
    return fetch(url,{method:"GET"})
        .then(response => {
            if(!response.ok){
                logAPIError(response);

                throw ERROR.RESPONSE.response_not_ok;
            }
            if(response.headers.get("content-type") !== "application/json"){
                logAPIError(response);
                
                throw ERROR.RESPONSE.unexpected_content_type;
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

                throw ERROR.RESPONSE.response_not_ok;
            }
            if(response.headers.get("content-type") !== "application/json"){
                logAPIError(response);
                
                throw ERROR.RESPONSE.unexpected_content_type;
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

                throw ERROR.RESPONSE.response_not_ok;
            }
            if(response.headers.get("content-type") !== "application/json"){
                logAPIError(response);
                
                throw ERROR.RESPONSE.unexpected_content_type;
            }
            return response.ok;
        })
        .catch(error => {
            logAPIError(error);

            return error;
        });
}

function logAPIError(error){
    console.log(error);
}