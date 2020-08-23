import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPhotos, deletePhotos } from '../redux/actions';
import { DEFAULT_SHOWING_ITEMS } from '../utils/const';
import Photo from './Photo';
import Selector from './Selector';
import UploadModal from './UploadModal';

const uploadIcon = require('../imgs/upload-icon.png');
const deleteIcon = require('../imgs/trash-icon.png');
const showingOptions = [5, 25, 50, 100, 250, 500];
const handleAmount = (photos, amount) => {
  if (!amount || amount === -1) return photos;
  return photos.slice(0, amount);
}

const PhotosContainer = ({ photos, uploadedPhotos, selectedPhotos, areAllLoaded, getPhotos, deletePhotos }) => {
  const [uploadDiplayed, setUploadDiplayed] = useState(false);
  const [showingOption, setShowingOption] = useState(DEFAULT_SHOWING_ITEMS);

  useEffect(() => {
    getPhotos(0, DEFAULT_SHOWING_ITEMS);
  }, [])

  const onUpdateShowingOption = option => {
    const count = photos.length;
    if (!areAllLoaded && option > count) {
      getPhotos(count - uploadedPhotos.length, option);
    }
    setShowingOption(option);
  }

  const onLoadMore = () => {
    const curIdx = showingOptions.findIndex(ot => ot === showingOption);
    const nextIdx = curIdx < showingOptions.length - 2 ? curIdx + 1 : curIdx;
    setShowingOption(showingOptions[nextIdx]);
    getPhotos(photos.length - uploadedPhotos.length, showingOptions[nextIdx]);
  }

  return (
    <div className="photos-container">
      <div className="photos-container-header">
        <h2 className="heading-title">Photos</h2>
        <div className="actions">
          {!!selectedPhotos.length && <div className="delete">
            <button className="btn btn--delete" onClick={ () => deletePhotos(selectedPhotos) }>
              <img src={ deleteIcon } alt="Delete photo" />
              <span>Delete { selectedPhotos.length } photos</span>
            </button>
          </div>}
          <button className="btn btn--upload" onClick={ () => setUploadDiplayed(true) }>
            <img src={ uploadIcon } alt="Upload photos" />
            <span> Upload</span>
          </button>
          <Selector 
            options={ showingOptions } 
            selectedValue={ showingOption } 
            onChange={ op => onUpdateShowingOption(op) } 
          />
        </div>
      </div>
      <div className="photos-list">
        {handleAmount(photos, showingOption).map((photo, idx) =>
          <Photo key={ idx } photo={{ ...photo, idx }} />
        )}
      </div>
      {!areAllLoaded && <div className="photos-container-footer">
        <button className="btn btn--load-more" onClick={ onLoadMore }>Load More</button>
      </div>}
      {uploadDiplayed && <UploadModal onClose={ () => setUploadDiplayed(false) }/>}
    </div>
  )
}

const mapStateToProps = state => ({
  photos: state.photos.documents,
  uploadedPhotos: state.photos.uploadedDocuments,
  selectedPhotos: state.photos.selectedPhotos,
  areAllLoaded: state.photos.areAllLoaded
})

export default connect(mapStateToProps, { getPhotos, deletePhotos })(PhotosContainer);