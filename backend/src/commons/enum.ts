export enum UserTypes {
  USER = 'USER',
  ASSOCIATE = 'ASSOCIATE',
  ADMIN = 'ADMIN',
}

export enum ErrorType {
  TokenExpiredError = 'TokenExpiredError',
}

export enum Role {
  USER = 'USER',
  ASSOCIATE = 'ASSOCIATE',
  ADMIN = 'ADMIN',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum ActionType {
  ADD_TO_CART = 'add_to_cart',
  ADD_QTY = 'add_qty',
  REMOVE_QTY = 'remove_qty',
  REMOVE = 'remove',
  REMOVE_PRODUCT = 'remove_product',
}
