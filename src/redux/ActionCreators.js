import * as ActionType from './ActionTypes';

export const addcomment = (dishId, rating, author, comment) => ({
  type:ActionType.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
})