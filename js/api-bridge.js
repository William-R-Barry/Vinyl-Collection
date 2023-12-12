import {ERROR} from "./codes.js";

export function fetchVinylById(id){
    const url = "http://localhost:8080/Vinyl collection/www/public/test-data/vinyl-record.json";
    
    return fetch(url,{method:"GET"})
        .then(reponse => reponse.json())
        .catch(error => {
            logAPIError(error);

            return error;
        });
}

export function fetchVinylLineItemsByFilter(filter){
    const url = "http://localhost:8080/Vinyl collection/www/public/test-data/vinyl-line-item-set.json";

    return fetch(url,{method:"GET"})
        .then(reponse => reponse.json())
        .catch(error => {
            logAPIError(error);

            return error;
        });
};

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

function logAPIError(error){
    console.log(error);
}