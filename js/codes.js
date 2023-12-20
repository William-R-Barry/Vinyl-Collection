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
        NO_ID_MATCHED: {
            CODE: "_no_match_found_for_id",
            MESSAGE: "No match found for the specified ID",
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
            MESSAGE: "The response was of an unexpected type",
        },
    },
    VINYL: {
        VALIDATION_FAILED: {
            CODE: "_validation_failed",
            MESSAGE: "The validation failed",
        },
    },
};