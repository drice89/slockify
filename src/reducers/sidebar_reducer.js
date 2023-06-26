import { TOGGLE_SIDEBAR } from "../actions/ui_actions"

const sidebarReducer = (state = false, action) => {
  Object.freeze(state)

  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
}

export default sidebarReducer