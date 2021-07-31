import {EditorState, AtomicBlockUtils} from 'draft-js'
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

// const handlePastedFiles = (files) => {
//   const formData = new FormData();
//   formData.append('file', files[0]);
//   fetch('/api/uploads', { method: 'POST', body: formData })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.file) {
//         setEditorState(insertImage(data.file)); //created below
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };




// const insertImage = (url) => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
//     return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '');
//   };


// const handlePastFiles = (files) => {
//     setEditorState(
//       insertImage(
//         'https://www.google.com/url?sa=i&url=https%3A%2F%2Fkiwwwi.pl%2Fco-to-jest-grafika-wektorowa-i-jakie-ma-zastosowanie%2F&psig=AOvVaw2m5_nkClvAEbo6ALlM8tHq&ust=1627825609474000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKDY8ou5jfICFQAAAAAdAAAAABAD'
//       ),
//       editorState
//     );
//   };
