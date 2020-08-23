import request from '../utils/request';
import { groupingPhotos } from '../utils/common';

export const GET_PHOTOS = 'GET_PHOTOS';
export const SET_LOADING = 'SET_LOADING';
export const UPLOAD_PHOTOS = 'UPLOAD_PHOTOS';
export const GET_ERROR_MESSAGE = 'GET_ERROR_MESSAGE';
export const ADD_TO_LIST = 'ADD_TO_LIST';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';
export const DELETE_PHOTOS = 'DELETE_PHOTOS';

export const getPhotos = (skip, limit) => dispatch => {
  dispatch(setLoading(true));
  request('post', '/photos/list', { data: { skip, limit } })
    .then(res => {
      dispatch({
        type: GET_PHOTOS,
        payload: res
      })
      dispatch(setLoading(false));
    })
}

export const uploadPhotos = (formData) => dispatch => {
  dispatch(setLoading(true));
  request(
    'put', 
    '/photos', 
    { 
      data: formData, 
      headers: {
        'content-type': 'multipart/form-data'
      } 
    })
    .then(res => {
      dispatch({
        type: UPLOAD_PHOTOS,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_ERROR_MESSAGE,
      payload: err.response.data.message
    }))
    .finally(() => dispatch(setLoading(false)))
}

export const addToList = photoId => dispatch => {
  dispatch({
    type: ADD_TO_LIST,
    payload: photoId
  })
}

export const removeFromList = photoId => dispatch => {
  dispatch({
    type: REMOVE_FROM_LIST,
    payload: photoId
  })
}

export const clearList = () => ({
  type: CLEAR_LIST
})

export const deletePhotos = photos => dispatch => {
  const data = groupingPhotos(photos)
  request('delete', '/photos', { data })
    .then(() => {
      dispatch({
        type: DELETE_PHOTOS,
        payload: photos
      })
      dispatch(clearList());
    })
}

export const setLoading = (bool) => ({
  type: SET_LOADING,
  payload: bool
})