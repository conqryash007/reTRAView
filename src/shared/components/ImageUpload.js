import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const filePikerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = (e) => {
    let pickedFile;
    let val = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setIsValid(true);
      setFile(pickedFile);
      val = true;
    } else {
      setIsValid(false);
      val = false;
    }
    props.onInput(props.id, pickedFile, val);
  };

  const pickImageHandler = () => {
    filePikerRef.current.click();
  };

  return (
    <>
      <input
        id={props.id}
        type="file"
        ref={filePikerRef}
        accept=".jpg, .png, .jpeg"
        style={{ display: "none" }}
        onChange={pickHandler}
      />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Box>
          {previewUrl && (
            <img
              style={{
                maxWidth: "400px",
                maxHeight: "220px",
                border: "solid #000",
              }}
              src={previewUrl}
              alt="PREVIEW"
            />
          )}
          {!previewUrl && (
            <div
              style={{
                border: "solid #ccc",
                padding: "20px",
              }}
            >
              <h3>PLEASE SELECT AN IMAGE</h3>
            </div>
          )}
        </Box>
        <Button onClick={pickImageHandler} variant="outlined" color="success">
          ADD IMAGE
        </Button>
      </Box>
    </>
  );
};

export default ImageUpload;
