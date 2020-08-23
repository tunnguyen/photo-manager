import { combineReducers } from 'redux';
import { GET_PHOTOS, SET_LOADING, UPLOAD_PHOTOS, GET_ERROR_MESSAGE, ADD_TO_LIST, REMOVE_FROM_LIST, CLEAR_LIST, DELETE_PHOTOS } from './actions';

const initialState = {
  documents: [],
  uploadedDocuments: [],
  areAllLoaded: false,
  errorMessage: '',
  selectedPhotos: [],
  loading: false
}

const photoReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PHOTOS:
      const { documents, limit, skip, count } = action.payload;
      const condition = limit - skip > 0 ? limit - skip : limit;
      return {
        ...state,
        documents: [ ...state.documents, ...documents ],
        areAllLoaded: count < condition
      }
    case UPLOAD_PHOTOS:
      return {
        ...state,
        documents: [ ...action.payload, ...state.documents ],
        uploadedDocuments: [ ...action.payload, ...state.uploadedDocuments],
        errorMessage: ''
      }
    case ADD_TO_LIST:
      return {
        ...state,
        selectedPhotos: [ ...state.selectedPhotos, action.payload ]
      }
    case REMOVE_FROM_LIST:
      return {
        ...state,
        selectedPhotos: state.selectedPhotos.filter(elm => elm.id !== action.payload)
      }
    case CLEAR_LIST:
      return {
        ...state,
        selectedPhotos: []
      }
    case DELETE_PHOTOS:
      const updatedDocuments = state.documents;
      action.payload.forEach(elm => {
        updatedDocuments.splice(elm.idx, 1);
      })

      return {
        ...state,
        documents: updatedDocuments
      }
    case GET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}

export default combineReducers({
  photos: photoReducer
})