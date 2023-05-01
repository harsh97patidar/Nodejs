// import axios from "axios";
import React from "react";

const UploadImage = ({ setFile }) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   formData.append("postId", 1);

  //   fetch("http://localhost:8000/image", {
  //     method: "POST",
  //     body: formData,
  //   });
  // };

  return (
    // <form
    //   action="http://localhost:8000/image"
    //   method="post"
    //   enctype="multipart/form-data"
    // >
    //   <input type="file" name="image" />
    //   <button type="submit">Upload</button>
    // </form>
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {/* <button onClick={handleUpload}>Upload</button> */}
      {/* {fileData && <img src={fileData} alt="Uploaded file" />} */}
    </div>
  );
};

export default UploadImage;
