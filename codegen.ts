import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts", "src/pages/api/**/*.ts"],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
