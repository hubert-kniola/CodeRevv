
export type InlineStyle = {
    label: string;
    value: string;
    type: "style" | "block";
}

export const inlineStyles: InlineStyle[] =[
    {
        label: "Bold",
        value: "BOLD",
        type: "style"
    },
    {
        label: "Italic",
        value: "ITALIC",
        type: "style"
    },
    {
        label: "Underline",
        value: "UNDERLINE",
        type: "style"
    },
    {
        label: "Code",
        value: "CODE",
        type: "style"
    }
]
