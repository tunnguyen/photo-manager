import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FileDrop } from 'react-file-drop';
import { uploadPhotos } from '../redux/actions';
import Selector from './Selector';

const uploadIcon = require('../imgs/upload-icon.png');
const albums = [ 'Travel', 'Personal', 'Food', 'Nature', 'Other' ];
const validateFile = (fileName) => {
  const extension = fileName.substr(fileName.lastIndexOf('.') + 1);
  if (!/(jpg|jpeg|png|webp)$/ig.test(extension)) return false;
  return true;
}

const UploadModal = ({ onClose, uploadPhotos, errorMessage }) => {
  const [uploadable, setUploadable] = useState(false);
  const [album, setAlbum] = useState('');
  const [documents, setDocuments] = useState([]);

  const onSelectFile = files => {
    const file = files[0];
    if (documents.some(doc => doc.name === file.name) // reject existed files
    || !validateFile(file.name)) return;

    setDocuments([ ...documents, file ]);
    setUploadable(true);
  }

  const onRemoveFile = fileName => {
    setDocuments(documents.filter(doc => doc.name !== fileName));
    if (documents.length - 1 < 1) return setUploadable(false);
  }

  const onUpload = () => {
    const formData = new FormData();
    formData.append('album', album);
    documents.forEach((file) => {
      formData.append('documents', file, file.name);
    });
    uploadPhotos(formData);
  }

  return (
    <div className="upload-modal">
      <div className="upload-modal-inner">
        <div className="upload-modal-header">
          <h3>Upload photos</h3>
          <button className="btn btn--close" onClick={ onClose } />
        </div>
        {album && <>
          <div className="drop-zone">
            <FileDrop onDrop={ onSelectFile }>
              <input type="file" onChange={ e => onSelectFile(e.target.files) } />
              Drag 'n' drop some files here, or click to select files
            </FileDrop>
          </div>
          {!documents.length && <div className="message">No file selected...</div>}
          {!!documents.length && <ul className="upload-list">
            {documents.map((doc, idx) => 
              <li key={ idx } className="upload-file">
                <span>{ doc.name }</span>
                <button className="btn btn--close" onClick={ () => onRemoveFile(doc.name) }></button>
              </li>
            )}
          </ul>}
        </>}
        {!!errorMessage && <div className="error">{ errorMessage }</div>}
        <div className="upload-modal-footer">
          <Selector options={ albums } label="Select album" onChange={ setAlbum } />
          <button className="btn btn--upload" disabled={ !uploadable } onClick={ onUpload }>
            <img src={ uploadIcon } alt="Upload photo" />
            <span> Upload</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  errorMessage: state.photos.errorMessage
})

export default connect(mapStateToProps, { uploadPhotos })(UploadModal);