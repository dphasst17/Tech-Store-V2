import { colorCode } from "./colorCode";
export const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "indent",
  "list",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "formula",
  "customImage"
];
export const tollBars = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ size: [] }],
  [{ font: [] }],
  [{ align: ["right", "center", "justify"] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image", "code-block"],
  [{ color: colorCode }],
  [{ background: colorCode }],
  ["customImage"]
];