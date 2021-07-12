import { Editor, EditorState } from "draft-js";
import { FC, useState,useRef } from "react"


export const RichTextEditor: FC = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const change = (state: EditorState) => {
        setEditorState( () => state );
    }

    const editor = useRef(null);
    return(
        <>
        <Editor
            ref={editor}
            editorState={editorState}
            onChange={change}
        />
        </>
    )
}