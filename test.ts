import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

//* Query profiles on sandbox mumbai
const API_URL = "https://api-sandbox-mumbai.lens.dev/";

const apolloClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

interface ProfileQueryRequest {
  ownedBy: string[];
  limit: number;
}

const params: ProfileQueryRequest = {
  ownedBy: [
    "0x2CEedA4a489dB468e594dcCc7613A1B8Ed111d76",
    "0xbe73Ab71379aA91866a32eC21E8f1Eb15ECaDa2E",
  ],
  limit: 10,
};

const query = gql`
  query Profiles($input: ProfileQueryRequest!) {
    profiles(request: $input) {
      items {
        handle
      }
    }
  }
`;

const queryExample = async () => {
  const response = await apolloClient.query({
    query: query,
    variables: {
      input: params,
    },
  });
  console.log("Lens example data: ", response.data.profiles.items);
};

async function main() {
  await queryExample();
}

main();
