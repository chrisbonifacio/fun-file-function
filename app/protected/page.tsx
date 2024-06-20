"use client";

import React from "react";
import { downloadData, getUrl, uploadData } from "aws-amplify/storage";
import {
  WithAuthenticatorProps,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

function ProtectedPage({ signOut }: WithAuthenticatorProps) {
  const [file, setFile] = React.useState<File>();
  const [imagePath, setImagePath] = React.useState<string>();

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <div>
        <div>
          <input type="file" onChange={handleChange} />
          <button
            onClick={async () => {
              if (file) {
                const path = `picture-submissions/${file.name}`;

                await uploadData({
                  path,
                  data: file,
                });

                setImagePath(path);
              }
            }}
          >
            Upload
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              if (file) {
                await uploadData({
                  path: ({ identityId }) => {
                    return `profile-pictures/${identityId}/${file.name}`;
                  },
                  data: file,
                });
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
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(ProtectedPage);
