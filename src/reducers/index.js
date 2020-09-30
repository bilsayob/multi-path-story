import { ACTION_TYPES } from '../actions';

const ROOT_PATH_KEY = "s0";

const getPathKey = (state, index) => {

    let pathKey = state.currentPathKey;

    if (index) {
        pathKey = `${pathKey}.${index}`
    }

    return pathKey;
}

export default (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SAVE_PATH: {
            const update = Object.assign({}, state);
            let pathKey = getPathKey(state, action.payload.index);
            update[pathKey] = action.payload.sentence;

            return update;
        }
        case ACTION_TYPES.SELECT_PATH: {
            const update = Object.assign({}, state);

            if (action.payload.index) {
                update.currentPathKey = getPathKey(state, action.payload.index);
            }

            return update;
        }
        case ACTION_TYPES.GO_BACK_TO_PREVIOUS_PATH: {
            const update = Object.assign({}, state);

            const currentPathParts = update.currentPathKey.split('.');
            if (1 < currentPathParts.length) {
                currentPathParts.splice(-1);
                update.currentPathKey = currentPathParts.join('.');
            }

            return update;
        }
        case ACTION_TYPES.GO_BACK_TO_ROOT_PATH: {
            const update = Object.assign({}, state);

            update.currentPathKey = ROOT_PATH_KEY;

            return update;
        }
        case ACTION_TYPES.GO_TO_PATH: {
            const update = Object.assign({}, state);

            update.currentPathKey = action.payload.key;

            return update;
        }
        default:
            return state;
    }
};