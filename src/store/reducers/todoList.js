import * as actionTypes from '../actions/actionTypes';

const initialState = {
  listItems: [],
  error: null,
  loading: false,
  compBtnloader: false,
  addLoader: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LISTITEMS:
      return {
        ...state,
        listItems: action.listItems,
        error: false,
        loading: false,
      };
    case actionTypes.FETCH_LISTITEMS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_LISTITEMS_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case actionTypes.ADD_LISTITEM_STARTING:
      return {
        ...state,
        addLoader: true,
      };

    case actionTypes.ADD_LISTITEM_SUCCESS:
      const newListItem = {
        ...action.listItem,
        id: action.listID,
      };
      return {
        ...state,
        listItems: state.listItems.concat(newListItem),
        addLoader: false,
      };

    case actionTypes.ADD_LISTITEM_FAIL:
      return {
        ...state,
        addLoader: false,
      };

    case actionTypes.REMOVE_LISTITEM_SUCCESS:
      return {
        ...state,
        listItems: state.listItems.filter(item => item.id !== action.removedID),
      };

    case actionTypes.COMPLETE_LISTITEM_STARTING:
      return {
        ...state,
        compBtnloader: true,
      };

    case actionTypes.COMPLETE_LISTITEM_SUCCESS:
      const completedItem = state.listItems.find(
        item => item.id === action.completedItemID
      );

      const upState = [...state.listItems];
      upState.forEach(item => {
        if (item.id === action.completedItemID) {
          item.isComplete = !completedItem.isComplete;
        }
      });

      return {
        ...state,
        listItems: upState,
        compBtnloader: false,
      };
    case actionTypes.COMPLETE_LISTITEM_FAIL:
      return {
        ...state,
        compBtnloader: false,
      };
    default:
      return state;
  }
};

export default reducer;
