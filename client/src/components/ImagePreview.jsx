import React, { Component } from 'react';

// import Uploader from 'react-images-upload';
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
      imagePreview: null,
      imageFile: null
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
    const { imageFromUploader } = this.props;
    reader.onloadend = () => {
      this.setState({ imagePreview: reader.result, imageFile }, () => {
        imageFromUploader(this.state.imageFile);
      });
    };
    reader.readAsDataURL(imageFile);
  }
  handleChooseImageClick(event) {
    event.preventDefault();
    this.imageSelector.click();
  }
  onImageDelete() {
    this.setState({ imagePreview: null });
  }
  render() {
    const { handleChooseImageClick, onImageAdd, onImageDelete } = this;
    const { imagePreview } = this.state;
    const displayUpload = classnames({
      uploadPicturesWrapper: imagePreview ? trueValue : falseValue,
      'hide-area': !imagePreview ? trueValue : falseValue
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
                <img src={imagePreview} className="uploadPicture"
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
