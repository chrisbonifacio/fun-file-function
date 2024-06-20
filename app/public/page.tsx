"use client";

import React from "react";
import { uploadData } from "aws-amplify/storage";

import "@aws-amplify/ui-react/styles.css";
import { StorageImage } from "@aws-amplify/ui-react-storage";

function ProtectedPage() {
  const [file, setFile] = React.useState<File>();
  const [imagePath, setImagePath] = React.useState<string>();

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h1>Public Page</h1>
      <div>
        <input type="file" onChange={handleChange} />
        <button
          onClick={async () => {
            if (file) {
              const path = `picture-submissions/${file.name}`;

              const result = await uploadData({
                path,
                data: file,
              }).result;

              setImagePath(result.path);
            }
          }}
        >
          Upload
        </button>

        <div>
          <button
            onClick={async () => {
              if (file) {
                const path = `profile-pictures/test/${file.name}`;

                try {
                  const result = await uploadData({
                    path,
                    data: file,
                  }).result;

                  setImagePath(result.path);
                } catch (error) {
                  console.error(error);
                }
              }
            }}
          >
            Upload Protected Photo
          </button>
        </div>

        <div>
          <h2>Images</h2>

          {imagePath && (
            <StorageImage path={imagePath} alt="user image" width={100} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProtectedPage;
