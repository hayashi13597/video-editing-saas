import dotenv from "dotenv";
dotenv.config();

module.exports = {
  petstore: {
    output: {
      mode: "tags-split",
      target: "./src/orvalApi/endpoints/generated.ts",
      schemas: "./src/orvalApi/model",
      tsconfig: "./tsconfig.json",
      client: "axios",
      prettier: true,
      override: {
        mutator: {
          path: "./src/lib/custom-instance.ts",
          name: "customInstance"
        }
      }
    },
    input: {
      target: process.env.SWAGGER_URL
    }
  }
};
