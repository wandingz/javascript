export const LOADING = "LOADING";

export const LOADING_PENDING = "LOADING_PENDING";
export const LOADING_FINISHED = "LOADING_FINISHED";
export const LOADING_ERROR = "LOADING_ERROR";

export function loading(target, status) {
    return {
        type: LOADING,
        target: target,
        status: status,
    };
}
