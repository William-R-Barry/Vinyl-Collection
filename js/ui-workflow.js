import {Vinyl} from "./vinyl.js";
import {
    getVinylFormValues,
    getVinlyId,
    fetchVinylById,
    renderVinylForm,
} from "./frontend-common.js";
import {
    fetchVinylsByFilter,
    renderVinylLineItems,
} from "./frontend-search.js";
import {
    renderVinyl,
    renderVinylFormActionsView,
} from "./frontend-view.js";
import {
    renderVinylFormActionsNew,
    createVinyl,
} from "./frontend-create.js";
import {
    renderVinylFormActionsEdit,
    updateVinyl,
} from "./frontend-update.js";
import {ERROR} from "./codes.js";

export function loadViewVinyl(contentContainerId, actionsContainerId){
    try{
        const vinylId = getVinlyId();
        fetchVinylById(vinylId).then(vinylDataObject => {
            renderVinyl(vinylDataObject, contentContainerId);
            renderVinylFormActionsView(actionsContainerId, vinylFormOnClick);

            function vinylFormOnClick(){

            }
        }).catch(error => {
            console.log(error);
            alert("ERROR: something went wrong with the request.");
        });
    }
    catch(error){
        switch(error){
            case ERROR.REQUEST.no_id_specified:
                alert("ERROR: No vinyl ID has been specified.");
            break;
            case ERROR.REQUEST.no_id_matched:
                alert("ERROR: No match could be found for the specified vinyl ID.");
            break;
            default: alert(error);
        }
    }
}

export function loadCreateVinyl(contentContainerId, actionsContainerId){
    const newVinylDataObject = new Vinyl();
    renderVinylForm(newVinylDataObject, contentContainerId);
    renderVinylFormActionsNew(actionsContainerId, contentContainerId, vinylFormOnClick);

    function vinylFormOnClick(){
        const vinylDataObject = getVinylFormValues(newVinylDataObject);
        createVinyl(vinylDataObject);
    }
}

export function loadEditVinyl(contentContainerId, actionsContainerId){
    try{
        const vinylId = getVinlyId();
        fetchVinylById(vinylId).then(existingVinylDataObject => {
            renderVinylForm(existingVinylDataObject, contentContainerId);
            renderVinylFormActionsEdit(actionsContainerId, contentContainerId, vinylFormOnClick);

            function vinylFormOnClick(){
                const vinylDataObject = getVinylFormValues(existingVinylDataObject);
                updateVinyl(vinylDataObject);
            }
        }).catch(error => {
            alert("ERROR: something went wrong with the request.");
        });
    }
    catch(error){
        switch(error){
            case ERROR.REQUEST.no_id_specified:
                alert("ERROR: No vinyl ID has been specified.");
            break;
            case ERROR.REQUEST.no_id_matched:
                alert("ERROR: No match could be found for the specified vinyl ID.");
            break;
            default: alert(error);
        }
    }
}

export function loadSearchVinyl(){
    const defaultFilter = "";

    fetchVinylsByFilter(defaultFilter).then(vinylDataObjects => {
        renderVinylLineItems(vinylDataObjects, "search_results");
    }).catch(error => {
        alert("ERROR: something went wrong with the request.");
    });
}