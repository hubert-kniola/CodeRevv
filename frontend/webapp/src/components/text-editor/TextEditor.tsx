import { FC, useState } from "react";
import RichTextEditor, { EditorValue, ToolbarConfig } from 'react-rte'

export const TextEditor: FC = () => {
  const [value, setValue] = useState<EditorValue>(RichTextEditor.createEmptyValue());
 



  return(
      <RichTextEditor
        value={value}
        onChange={(value) => setValue(value)}
      />
  )
}


