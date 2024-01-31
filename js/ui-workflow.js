import {Vinyl,} from "./vinyl.js";
import {
    getVinylFormValues,
    getVinlyId,
    fetchVinylById,
    renderVinylForm,
    sendCreateVinyl,
    sendUpdateVinyl,
    displaySuccessMessage,
    displayInformationMessage,
    displayErrorMessage,
    logError,
} from "./frontend-common.js";
import {fetchVinylsByFilter, renderVinylLineItems,} from "./frontend-search.js";
import {renderVinyl, renderVinylFormActionsView,} from "./frontend-view.js";
import {renderVinylFormActionsNew,} from "./frontend-create.js";
import {renderVinylFormUpdateActions,} from "./frontend-update.js";
import {SUCCESS, ERROR,} from "./codes.js";

export function loadViewVinyl(contentContainerId, actionsContainerId){
    let vinylId;

    try{
        vinylId = getVinlyId();
    }
    catch(error){
        switch(error.message){
            case ERROR.REQUEST.NO_ID_SPECIFIED.CODE:
                displayErrorMessage(ERROR.REQUEST.NO_ID_SPECIFIED.MESSAGE);
            break;
            default:
                logError(error);
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
        }

        return;
    }
    fetchVinylById(vinylId).then(vinyl => {
        renderVinyl(vinyl, contentContainerId);
        renderVinylFormActionsView(vinyl, actionsContainerId);
    }).catch(error => {
       switch(error.message){
            case ERROR.RESPONSE.NO_ID_MATCHED.CODE:
                displayErrorMessage(ERROR.RESPONSE.NO_ID_MATCHED.MESSAGE);
            break;
            default:
                logError(error);
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
        }
    });
}

export function loadCreateVinyl(contentContainerId, actionsContainerId){
    const newVinyl = new Vinyl();
    renderVinylForm(newVinyl, contentContainerId);
    renderVinylFormActionsNew(actionsContainerId, contentContainerId, vinylFormOnClick);

    function vinylFormOnClick(){
        try{
            const vinyl = getVinylFormValues(newVinyl);
            if(!vinyl.validate()){ 
                displayErrorMessage(ERROR.VINYL.VALIDATION_FAILED.MESSAGE);
                return;
             }
            createVinyl(vinyl).then(response => { 
                displaySuccessMessage(SUCCESS.VINYL.RECORD_CREATED.MESSAGE); 
            }).catch(error => {
                logError(error);
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
            });
        }
        catch(error){
            switch(error.message){
                case ERROR.VINYL.VALIDATION_FAILED.CODE:        
                    displayErrorMessage(ERROR.VINYL.VALIDATION_FAILED.MESSAGE);
                break;
                default:
                    logError(error);
                    displayErrorMessage(ERROR.GENERIC.MESSAGE);
            }
        }
    }
}

function createVinyl(vinylDataObject){
    return sendCreateVinyl(vinylDataObject);
}

export function loadUpdateVinyl(contentContainerId, actionsContainerId){
    let vinylId;

    try{
        vinylId = getVinlyId();
    }
    catch(error){
        switch(error.message){
            case ERROR.REQUEST.NO_ID_SPECIFIED.CODE:
                displayErrorMessage(ERROR.REQUEST.NO_ID_SPECIFIED.MESSAGE);
            break;
            default:
                logError(error);
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
        }

        return;
    }

    fetchVinylById(vinylId).then(existingVinylDataObject => {
        renderVinylForm(existingVinylDataObject, contentContainerId);
        renderVinylFormUpdateActions(actionsContainerId, contentContainerId, vinylFormOnClick);

        function vinylFormOnClick(){
            const vinylDataObject = getVinylFormValues(existingVinylDataObject);
            
            if(!vinylDataObject.validate()){
                displayErrorMessage(ERROR.VINYL.VALIDATION_FAILED.MESSAGE);

                return;
            }
            
            updateVinyl(vinylDataObject).then(response => { displaySuccessMessage(SUCCESS.VINYL.RECORD_UPDATED.MESSAGE); })
            .catch(error => {
                logError(error);
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
            });
        }
    }).catch(error => {
        switch(error.message){
            case ERROR.RESPONSE.NO_ID_MATCHED.CODE:
                displayErrorMessage(ERROR.RESPONSE.NO_ID_MATCHED.MESSAGE);
            break;
            default:
                logError(error);
                displayErrorMessage(ERROR.GENERIC.MESSAGE);
        }
    });
}

function updateVinyl(vinylDataObject){
    return sendUpdateVinyl(vinylDataObject)
}

export function loadSearchVinyl(){
    const defaultFilter = {
        title: "the good son"
    };

    fetchVinylsByFilter(defaultFilter).then(vinylLineItems => {
        if(vinylLineItems.length > 0) renderVinylLineItems(vinylLineItems, "search_results");
        else displayInformationMessage("Sorry, no vinyl matched your criteria.");
    }).catch(error => {
        logError(error);
        displayErrorMessage(ERROR.GENERIC.MESSAGE);
    });
}