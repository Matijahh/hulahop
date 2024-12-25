import styled from "styled-components";

import { Component } from "react";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const ReactQuillContainer = styled.div`
  .input-label {
    margin-bottom: 9px;
  }
  .ql-editor {
    min-height: 150px;
  }
`;

class ReactQuillEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleChange, value, placeholder, className, label } = this.props;

    return (
      <ReactQuillContainer>
        {label && <label className="input-label">{label}</label>}
        <ReactQuill
          className={className}
          theme="snow"
          value={value || ""}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
          ]}
          placeholder={placeholder || "Type something..."}
        />
      </ReactQuillContainer>
    );
  }
}

export default ReactQuillEditor;
