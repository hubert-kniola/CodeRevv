import { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin, { readFile } from '@draft-js-plugins/drag-n-drop-upload';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(resizeablePlugin.decorator, focusPlugin.decorator, blockDndPlugin.decorator);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

export const plugins = [dragNDropFileUploadPlugin, blockDndPlugin, focusPlugin, resizeablePlugin, imagePlugin];

export default function mockUpload(data, success, progress) {
    function doProgress(percent) {
      progress(percent || 1);
      if (percent === 100) {
        Promise.all(data.files.map(readFile)).then((files) => success(files, { retainSrc: true }));
      } else {
        setTimeout(doProgress, 250, (percent || 0) + 10);
      }
    }
  
    doProgress();
  }
  