import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addToList, removeFromList } from '../redux/actions';

const checkedIcon = require('../imgs/checked-icon.png');

const Photo = ({ photo, addToList, removeFromList, selectedPhotos }) => {
  const [checked, setChecked] = useState(false);

  const onSelect = () => {
    if (!checked) {
      addToList(photo);
    } else {
      removeFromList(photo.id);
    }
    setChecked(!checked);
  }

  return (
    <div className={ `photo ${ !!selectedPhotos.length && 'blur' } ${ !!checked && 'checked' }` } onClick={ onSelect }>
      <img className="checked-icon" src={ checkedIcon } alt={ photo.name } />
      <div className="photo__img">
        <img src={ photo.raw } alt={ photo.name } />
      </div>
      <b className="photo__name">{ photo.name }</b>
      <span className="photo__album">{ photo.album }</span>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedPhotos: state.photos.selectedPhotos
})

export default connect(mapStateToProps, { addToList, removeFromList })(Photo);