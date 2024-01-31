export const SUCCESS = {
    REQUEST: {
        REQUEST_SUCCESSFUL: {
            CODE: "_request_successful",
            MESSAGE: "The request was successful",
        },
    },
    RESPONSE: {
        RESPONSE_OK: {
            CODE: "_response_ok",
            MESSAGE: "The response was ok",
        },
    },
    VINYL: {
        RECORD_CREATED: {
            CODE: "_record_created",
            MESSAGE: "The record was successfully created",
        },
        RECORD_UPDATED: {
            CODE: "_record_updated",
            MESSAGE: "The record was successfully updated",
        },
    },
};

export const ERROR = {
    GENERIC: {
        CODE: "_generic_error",
        MESSAGE: "Something went wrong",
    },
    REQUEST: {
        NO_ID_SPECIFIED: {
            CODE: "_no_id_specified",
            MESSAGE: "No id specified",
        },
        REQUEST_FAILED: {
            CODE: "_request_failed",
            MESSAGE: "The request failed",
        },
    },
    RESPONSE: {
        RESPONSE_NOT_OK: {
            CODE: "_response_not_ok",
            MESSAGE: "The request response was not ok",
        },
        UNEXPECTED_CONTENT_TYPE: {
            CODE: "_unexpected_content_type",
            MESSAGE: "The request response was of an unexpected type",
        },
        INVALID_REQUEST: {
            CODE: "_invalid_request",
            MESSAGE: "The request is invalid",
        },
        NO_ID_MATCHED: {
            CODE: "_no_match_found_for_id",
            MESSAGE: "No match found for the specified ID",
        },
    },
    VINYL: {
        VALIDATION_FAILED: {
            CODE: "_validation_failed",
            MESSAGE: "The validation failed",
        },
    },
};

export const API ={
    ERROR: {
        INVALID_REQUEST: {
            CODE: "_invalid_request",
            MESSAGE: "Invalid request",
        },
        NO_RECORD_FOUND: {
            CODE: "_no_record_found",
            MESSAGE: "The record could not be found",
        },
        RECORD_NOT_CREATED: {
            CODE: "_the_record_could_not_be_created",
            MESSAGE: "The record could not be created",
        },
        RECORD_NOT_UPDATED: {
            CODE: "_the_record_could_not_be_updated",
            MESSAGE: "The record could not be updated",
        },
        RECORD_NOT_DELETED: {
            CODE: "_the_record_could_not_be_deleted",
            MESSAGE: "The record could not be deleted",
        },
    },
};