require('dotenv').config();

const { expo } = require('./app.json');
const productionApolloUri =
  'https://rate-repository-api.ext.ocp-prod-0.k8s.it.helsinki.fi/graphql';
const apolloUri =
  process.env.NODE_ENV === 'production'
    ? productionApolloUri
    : process.env.EXPO_PUBLIC_APOLLO_URI || productionApolloUri;

module.exports = {
  ...expo,
  owner: 'dictorphil24s-team',
  updates: {
    url: 'https://u.expo.dev/4c5d0093-cfc2-4cd6-ac37-0d8009af9ba1',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  extra: {
    ...expo.extra,
    eas: {
      projectId: '4c5d0093-cfc2-4cd6-ac37-0d8009af9ba1',
    },
    apolloUri,
  },
};