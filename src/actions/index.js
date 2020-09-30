import * as TYPES from './types';

export function savePath (index, sentence) {
    return {
        type: TYPES.SAVE_PATH,
        payload: {
            index,
            sentence
        }
    }
}

export function selectPath (index) {
    return {
        type: TYPES.SELECT_PATH,
        payload: {
            index
        }
    }
}

export function goBackToPreviousPath () {
    return {
        type: TYPES.GO_BACK_TO_PREVIOUS_PATH
    }
}

export function goBackToRootPath () {
    return {
        type: TYPES.GO_BACK_TO_ROOT_PATH
    }
}

export function goToPath (key) {
    return {
        type: TYPES.GO_TO_PATH,
        payload: {
            key: key
        }
    }
}

export const ACTION_TYPES = TYPES;