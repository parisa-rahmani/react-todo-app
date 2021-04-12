import * as actionTypes from '../actions/actionTypes';

const initialState = {
  listItems: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LISTITEMS:
      return {
        ...state,
        listItems: action.listItems,
        error: false,
      };
    case actionTypes.FETCH_LISTITEMS_FAILED:
      return {
        ...state,
        error: true,
      };

    case actionTypes.ADD_LISTITEM_SUCCESS:
      const newListItem = {
        ...action.listItem,
        id: action.listID,
      };
      return {
        ...state,
        listItems: state.listItems.concat(newListItem),
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
    default:
      return state;
  }
};

export default reducer;
