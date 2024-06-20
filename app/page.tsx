"use client";

import React from "react";

import { signOut } from "aws-amplify/auth";
import { list } from "aws-amplify/storage";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function Home() {
  const [imagePaths, setImagePaths] = React.useState<string[]>();

  const getPictureSubmissions = async () => {
    let paths;

    const result = await list({
      path: "picture-submissions/",
    });

    console.log(paths);

    paths = result.items.map((item) => item.path);

    setImagePaths(paths);
  };

  React.useEffect(() => {
    getPictureSubmissions();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl mb-0">Amplify Gen 2 - Files and Functions</h1>
      <h2>in 30 Minutes or Less!</h2>

      <button
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </button>

      <h2>Images</h2>

      {imagePaths?.map((path) => (
        <StorageImage
          key={path}
          path={path}
          alt="user submitted photo"
          width={100}
        />
      ))}
    </main>
  );
}
