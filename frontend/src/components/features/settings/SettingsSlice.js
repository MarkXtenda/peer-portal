const initialState = {
    togle: "default",
    toggleState: false,
    seeMenu: false
}

export const settingsTogleAction = (togle) => {
    return {
      type: "settings/togle",
      payload: togle
    }
}

export const settingsSeeMenuAction = () => {
    return {
      type: "settings/seeMenu",
      payload: true
    }
}

export const settingsHideMenuAction = () => {
    return {
        type: 'settings/hideMenu',
        payload: false
    }
}
export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case "settings/togle":
            if (action.payload !== state.togle) {
                return { ...state, togle: action.payload, toggleState: !state.toggleState };
            }
            else {
                return { ...state, toggleState: !state.toggleState}
            }
        case "settings/seeMenu":
            return { ...state, togle: "default", seeMenu: action.payload}
        case "settings/hideMenu":
            return { ...state, seeMenu: action.payload}
        default:
          return state;
      }   
}