import { initialState } from "./initialState";
import {
  NEW_API_DATA,
  SET_SEARCH_INPUT,
  SET_SORT_INPUT,
  SET_RESET,
} from "./types";

export function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_API_DATA:
      return { ...state, simpsons: action.payload };

    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };

    case SET_SORT_INPUT:
      return { ...state, sortInput: action.payload };

    case SET_RESET:
      return { ...state, resetClick: action.payload };

    default:
      console.log("Reducer started or INVALID reducer type, probably a typo");
      return state;
  }
}
