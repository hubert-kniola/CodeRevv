import { FC, useRef, useState } from 'react';
import AceEditor from 'react-ace';

import { LoadingOverlay } from 'components';

import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/theme-monokai';

type Props = {
  name: string;
};

export const PythonEditor: FC<Props> = ({ name }) => {
  const [loading, setLoading] = useState(false);
  const editor = useRef<AceEditor>(null);

  const getCode = () => editor.current?.editor.getValue();

  const callJudge = () => {
    setLoading(true);

    console.log(getCode());

    setLoading(false);
  };

  return (
    <LoadingOverlay active={loading} text="Uruchamiamy kod...">
      <AceEditor
        mode="python"
        theme="monokai"
        onChange={() => {}}
        fontSize={20}
        name={name}
        ref={editor}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        style={{ width: '100%' }}
        commands={[
          {
            name: 'run',
            bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
            exec: callJudge,
          },
        ]}
      />
    </LoadingOverlay>
  );
};
