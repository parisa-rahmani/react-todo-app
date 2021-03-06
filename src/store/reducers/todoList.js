import * as actionTypes from '../actions/actionTypes';

const initialState = {
  listItems: [],
  error: null,
  loading: false,
  addLoader: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LISTITEMS:
      return {
        ...state,
        listItems: action.listItems,
        error: null,
        loading: false,
      };
    case actionTypes.FETCH_LISTITEMS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_LISTITEMS_FAILED:
      return {
        ...state,
        error: action.error,
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
      };
    case actionTypes.COMPLETE_LISTITEM_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
