import { defineFunction, defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "fun-file-function-bucket",
  access: (allow) => ({
    "profile-pictures/{entity_id}/*": [
      allow.guest.to(["read"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
    "picture-submissions/*": [
      allow.authenticated.to(["read", "write"]),
      allow.guest.to(["read", "write"]),
    ],
  }),
  triggers: {
    onUpload: defineFunction({
      entry: "./triggers/on-upload-handler.ts",
    }),
    onDelete: defineFunction({
      entry: "./triggers/on-delete-handler.ts",
    }),
  },
});
