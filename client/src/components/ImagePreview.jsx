import React, { Component } from 'react';

import classnames from 'classnames';

import Helper from '../helper/Helper';

const { uploadImage } = Helper;
const uploadIcon = uploadImage();
const trueValue = true;
const falseValue = false;

class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
    this.onImageAdd = this.onImageAdd.bind(this);
    this.handleChooseImageClick = this.handleChooseImageClick.bind(this);
    this.onImageDelete = this.onImageDelete.bind(this);
  }
  componentDidMount() {
    this.imageSelector = document.getElementById('imageSelect');
  }
  onImageAdd(event) {
    const reader = new FileReader();
    const imageFile = event.target.files[0];
    const { imageFromPreview } = this.props;
    reader.onloadend = () => {
      this.setState({ image: reader.result }, () => {
        imageFromPreview(this.state.image);
      });
    };
    reader.readAsDataURL(imageFile);
  }
  handleChooseImageClick(event) {
    event.preventDefault();
    this.imageSelector.click();
  }
  onImageDelete() {
    this.setState({ image: null });
  }
  render() {
    const { handleChooseImageClick, onImageAdd, onImageDelete } = this;
    const { image } = this.state;
    const displayUpload = classnames({
      uploadPicturesWrapper: image ? trueValue : falseValue,
      'hide-area': !image ? trueValue : falseValue
    });
    return (
      <div className="fileUploader">
        <div className="fileContainer">
          <img src={uploadIcon} className="uploadIcon" alt="Upload Icon" />
          <p className="">Max file size: 5mb, accepted: jpg|gif|png</p>
          <div className="errorsContainer">
          </div>
          <button type="submit" onClick={handleChooseImageClick}
            className="chooseFileButton ">
             Choose images
          </button>
          <input type="file" onChange={onImageAdd} name="" id="imageSelect"
            multiple="" accept="image/*" />
          <div className={displayUpload}>
            <div className="uploadPicturesInner">
              <div className="uploadPictureContainer">
                <div className="deleteImage" onClick={onImageDelete} >X</div>
                <img src={image} className="uploadPicture"
                  alt="preview" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImagePreview;
