import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
const Editor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) => {
  const myModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={myModules}
      className="h-100 mb-10"
    />
  );
};

export default Editor;
