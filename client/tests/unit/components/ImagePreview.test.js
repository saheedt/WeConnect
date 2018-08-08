import React from 'react';
import { shallow } from 'enzyme';

import ImagePreview from '../../../src/components/ImagePreview.jsx';

describe('<ImagePreview />', () => {
  const props = {
    imageFromPreview: jest.fn()
  };

  it('calls componentDidMount', () => {
    const didMount = jest.spyOn(ImagePreview.prototype, 'componentDidMount');
    shallow(<ImagePreview {...props} />);
    expect(didMount).toHaveBeenCalled();
  });

  it('contains .fileUploader', () => {
    const comp = shallow(<ImagePreview {...props} />);
    expect(comp.exists('.fileUploader')).toBeTruthy();
  });

  it('should call onImageDelete', () => {
    const comp = shallow(<ImagePreview {...props} />);
    const onDel = jest.spyOn(comp.instance(), 'onImageDelete');
    comp.instance().onImageDelete();
    expect(onDel).toHaveBeenCalled();
  });

  it('state.image should be null', () => {
    const comp = shallow(<ImagePreview {...props} />);
    comp.instance().onImageDelete();
    expect(comp.state().image).toBe(null);
  });

  it('calls onImageAdd', () => {
    const comp = shallow(<ImagePreview {...props} />);
    const onImageAdd = jest.spyOn(comp.instance(), 'onImageAdd');
    comp.instance().onImageAdd({
      preventDefault() {},
      target: {
        files: ['https://test.com']
      }
    });
    expect(onImageAdd).toHaveBeenCalled();
  });
});
