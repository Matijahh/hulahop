import { produce } from "immer";

import {
  SAVE_SHOP_CATEGORY_LIST,
  SAVE_TOKEN,
  SAVE_USER_DATA,
  SET_ASSOCIATE_STORE,
} from "../constants/actionTypes";

const initialState = {
  token: null,
  userData: null,
  shopCategoryDataList: null,
  storeData: null,
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SAVE_TOKEN:
        draft.token = action.data;
        break;
      case SAVE_USER_DATA:
        draft.userData = action.data;
        break;
      case SAVE_SHOP_CATEGORY_LIST:
        draft.shopCategoryDataList = action.data;
        break;
      case SET_ASSOCIATE_STORE:
        draft.storeData = action.data;
        break;
      default:
        break;
    }
  });
