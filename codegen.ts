import * as cli from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: cli.CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_ENDPOINT,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
