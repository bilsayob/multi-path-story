export const getCurrentSentence = (state) => {
    return state[state.currentPathKey]
}

export const getPathSentence = (state, index) => {
    if (state.currentPathKey) {
        return state[`${state.currentPathKey}.${index}`]
    }
}

export const canGoBack = (state) => {
    if (state.currentPathKey) {
        return -1 !== state.currentPathKey.indexOf('.')
    }
    return false
}

export const getHistory = (state) => {
    const history = [];
    if (state.currentPathKey) {
        
        let pathKey = state.currentPathKey;

        while(pathKey) {

            history.push({
                key: pathKey,
                sentence: state[pathKey]
            })

            const pathKeyParts = pathKey.split('.');

            if (1 < pathKeyParts.length) {
                pathKeyParts.splice(-1);
                pathKey = pathKeyParts.join('.')
            } else {
                pathKey = null;
            }
        }
    }
    return history.reverse();
}