export const TokenTime = Object.freeze({
  ACCESS_TOKEN_TIME: '4h',
  REFRESH_TOKEN_TIME: '1d',
});

export const ResponseType = {
  ERROR: 'error',
};

export const ORDER_TYPE = Object.freeze({
  DESC: 'DESC',
  ASC: 'ASC',
});

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;

export const Actiontype = {
  ADD_TO_CART: 'add_to_cart',
  ADD_QTY: 'add_qty',
  REMOVE_QTY: 'remove_qty',
  REMOVE: 'remove',
  REMOVE_PRODUCT: 'remove_product',
};

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
