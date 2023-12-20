import {Vinyl,} from "./vinyl.js";
import {
    getVinylFormValues,
    getVinlyId,
    fetchVinylById,
    renderVinylForm,
    sendCreateVinyl,
    sendUpdateVinyl,
    displaySuccessMessage,
    displayErrorMessage,
    logError,
} from "./frontend-common.js";
import {fetchVinylsByFilter, renderVinylLineItems,} from "./frontend-search.js";
import {renderVinyl, renderVinylFormActionsView,} from "./frontend-view.js";
import {renderVinylFormActionsNew,} from "./frontend-create.js";
import {renderVinylFormUpdateActions,} from "./frontend-update.js";
import {SUCCESS, ERROR,} from "./codes.js";

export function loadViewVinyl(contentContainerId, actionsContainerId){
    try{
        const vinylId = getVinlyId();
        fetchVinylById(vinylId).then(vinylDataObject => {
            renderVinyl(vinylDataObject, contentContainerId);
            renderVinylFormActionsView(actionsContainerId, vinylFormOnClick);

            function vinylFormOnClick(){

            }
        }).catch(error => {
            logError(error);
            displayErrorMessage(ERROR.GENERIC.MESSAGE);
        });
    }
    catch(error){
        switch(error){
            case ERROR.REQUEST.NO_ID_SPECIFIED.CODE:
                displayErrorMessage(ERROR.REQUEST.NO_ID_SPECIFIED.MESSAGE);
            break;
            case ERROR.REQUEST.NO_ID_MATCHED.CODE:
                displayErrorMessage(ERROR.REQUEST.NO_ID_MATCHED.MESSAGE);
            break;
            default:
                logError(error);
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
        }
    }
}

export function loadCreateVinyl(contentContainerId, actionsContainerId){
    const newVinylDataObject = new Vinyl();
    renderVinylForm(newVinylDataObject, contentContainerId);
    renderVinylFormActionsNew(actionsContainerId, contentContainerId, vinylFormOnClick);

    function vinylFormOnClick(){
        try{
            const vinylDataObject = getVinylFormValues(newVinylDataObject);
            if(!vinylDataObject.validate()){ throw ERROR.VINYL.VALIDATION_FAILED.CODE; }
            createVinyl(vinylDataObject).then(response => { displaySuccessMessage(SUCCESS.VINYL.RECORD_CREATED.MESSAGE); });
        }
        catch(error){
            logError(error);

            switch(error){
                case ERROR.VINYL.VALIDATION_FAILED.CODE:        
                    displayErrorMessage(ERROR.VINYL.VALIDATION_FAILED.MESSAGE);
                break;
                default:
                    displayErrorMessage(ERROR.GENERIC.MESSAGE);
            }
        }
    }
}

function createVinyl(vinylDataObject){
    return sendCreateVinyl(vinylDataObject).then(response => {
        return response;
    }).catch(error => {
        logError(error);
        displayErrorMessage();
    });
}

export function loadUpdateVinyl(contentContainerId, actionsContainerId){
    try{
        const vinylId = getVinlyId();
        fetchVinylById(vinylId).then(existingVinylDataObject => {
            renderVinylForm(existingVinylDataObject, contentContainerId);
            renderVinylFormUpdateActions(actionsContainerId, contentContainerId, vinylFormOnClick);

            function vinylFormOnClick(){
                const vinylDataObject = getVinylFormValues(existingVinylDataObject);
                if(!vinylDataObject.validate()){ throw ERROR.VINYL.VALIDATION_FAILED.CODE; }
                updateVinyl(vinylDataObject).then(response => { displaySuccessMessage(SUCCESS.VINYL.RECORD_UPDATED.MESSAGE); });
            }
        }).catch(error => {
            logError(error);

            switch(error){
                case ERROR.VINYL.VALIDATION_FAILED.CODE:        
                    displayErrorMessage(ERROR.VINYL.VALIDATION_FAILED.MESSAGE);
                break;
                default:
                    displayErrorMessage(ERROR.GENERIC.MESSAGE);
            }
        });
    }
    catch(error){
        logError(error);

        switch(error){
            case ERROR.REQUEST.NO_ID_SPECIFIED.CODE:
                displayErrorMessage(ERROR.REQUEST.NO_ID_SPECIFIED.MESSAGE);
            break;
            case ERROR.REQUEST.NO_ID_MATCHED.CODE:
                displayErrorMessage(ERROR.REQUEST.NO_ID_MATCHED.MESSAGE);
            break;
            default: 
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
        }
    }
}

function updateVinyl(vinylDataObject){
    return sendUpdateVinyl(vinylDataObject).then(response => {
        return response;
    }).catch(error => {
        logError(error);
        displayErrorMessage(ERROR.GENERIC.MESSAGE);
    });
}

export function loadSearchVinyl(){
    const defaultFilter = "";

    fetchVinylsByFilter(defaultFilter).then(vinylDataObjects => {
        renderVinylLineItems(vinylDataObjects, "search_results");
    }).catch(error => {
        logError(error);
        displayErrorMessage(ERROR.GENERIC.MESSAGE);
    });
}