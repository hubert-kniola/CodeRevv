import { FC, useEffect, useRef, useState } from 'react';
import AceEditor, { IAnnotation } from 'react-ace';
import axios from 'axios';

import { LoadingOverlay } from 'components';
import { promiseDelay } from 'utility';

import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/theme-monokai';

type Props = {
  name: string;
};

const JUDGE_URL = 'http://18.222.194.36:2358';
const LANG_ID = 71;

export const PythonEditor: FC<Props> = ({ name }) => {
  const [loading, setLoading] = useState(false);
  const [annotations, setAnnotations] = useState([] as IAnnotation[]);
  const aceRef = useRef<AceEditor>(null);

  useEffect(() => {
    aceRef.current?.editor?.getSession().setAnnotations(annotations);
  }, [annotations])

  const getCode = () => aceRef.current?.editor.getValue();

  const callJudge = async () => {
    setLoading(true);

    try {
      const submit = await axios.post(`${JUDGE_URL}/submissions`, { source_code: getCode(), language_id: LANG_ID });

      let result = await axios.get(`${JUDGE_URL}/submissions/${submit.data.token}`);

      while (result.data.status.id === 1) {
        await promiseDelay(200);
        result = await axios.get(`${JUDGE_URL}/submissions/${submit.data.token}`);
      }

      if (result.data.status.id !== 3) {
        const regex = RegExp(String.raw`line (\d*)(.|\s)*Error: (.*)`);
        const match = regex.exec(result.data.stderr);

        if (match != null) {
          setAnnotations([...annotations, {
            row: +match[1] - 1,
            column: 0,
            text: match[3],
            type: "error",
          }]);
        }
      } else {
        setAnnotations([]);
      }
      
      console.log(result.data);

    } catch (err) {
      console.log(err);
    }

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
        ref={aceRef}
        annotations={annotations}
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
