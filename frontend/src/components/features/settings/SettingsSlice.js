const initialState = {
    togle: "default",
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
          return { ...state, togle: action.payload };
        case "settings/seeMenu":
            return { ...state, togle: "default", seeMenu: action.payload}
        case "settings/hideMenu":
            return { ...state, seeMenu: action.payload}
        default:
          return state;
      }   
}