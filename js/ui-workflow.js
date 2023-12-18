import {Vinyl} from "./vinyl.js";
import {
    renderVinyl,
    renderVinylForm,
    renderVinylFormActionsView,
    renderVinylFormActionsNew,
    renderVinylFormActionsEdit,
    renderVinylLineItems,
    getVinylFormValues,
    getVinlyId,
    fetchVinylById,
    fetchVinylsByFilter,
} from "./vinyl-frontend.js";
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
    let vinylDataObject = new Vinyl();
    renderVinylForm(vinylDataObject, contentContainerId);
    renderVinylFormActionsNew(actionsContainerId, contentContainerId, vinylFormOnClick);

    function vinylFormOnClick(){
        getVinylFormValues(vinylDataObject);
    }
}

export function loadEditVinyl(contentContainerId, actionsContainerId){
    try{
        const vinylId = getVinlyId();
        fetchVinylById(vinylId).then(vinylDataObject => {
            renderVinylForm(vinylDataObject, contentContainerId);
            renderVinylFormActionsEdit(actionsContainerId, contentContainerId, vinylFormOnClick);

            function vinylFormOnClick(){
                getVinylFormValues(vinylDataObject);
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

export function loadVinylSearch(){
    let filter = "";

    fetchVinylsByFilter(filter).then(vinylDataObjects => {
        renderVinylLineItems(vinylDataObjects, "search_results");
    }).catch(error => { 
        alert("ERROR: something went wrong with the request.");
    });
}