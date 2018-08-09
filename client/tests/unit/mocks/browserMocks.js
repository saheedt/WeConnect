import React from 'react';
import { JSDOM } from 'jsdom';

const rrd = require('react-router-dom');
// Just render plain div with its children
const mockBrowserRouter = ({ children }) => <div>{children}</div>;
rrd.BrowserRouter = mockBrowserRouter;

const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.requestAnimationFrame = dom.window.requestAnimationFrame;
global.FileReader = class FileReader {
  readAsDataURL(x) {
    return x;
  }
};
global.M = {
  toast: jest.fn()
};
global.document.addEventListener = jest.fn();
global.window.$$cachedEventForProfile$$ = jest.fn();

module.exports = rrd;
