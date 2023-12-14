import {ERROR} from "./codes.js";

export function fetchVinylById(id){
    const url = "http://localhost:8080/Vinyl collection/www/public/test-data/vinyl-record.json";
    
    return apiRequestGet(url);
}

export function fetchVinylLineItemsByFilter(filter){
    const url = "http://localhost:8080/Vinyl collection/www/public/test-data/vinyl-line-item-set.json";

    return apiRequestGet(url);
};

const API_PARAMETERS = {
    url: "",
    port: "",
}

function apiRequestGet(url){
    return fetch(url,{method:"GET"})
        .then(response => {
            console.log("GET responded.");
            if(!response.ok){
                logAPIError(response);

                throw ERROR.RESPONSE.response_not_ok;
            }
            if(response.headers.get("content-type") !== "application/json"){
                logAPIError(response);
                
                throw ERROR.RESPONSE.unexpected_response_content_type;
            }
            return response.json(); // note: the fetch json method resolves to a JavaScript object not JSON.
        })
        .catch(error => {
            logAPIError(error);

            return error;
        });
}

function logAPIError(error){
    console.log(error);
}