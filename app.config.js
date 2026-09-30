require('dotenv').config();

const { expo } = require('./app.json');

module.exports = {
  ...expo,
  extra: {
    ...expo.extra,
    apolloUri: process.env.EXPO_PUBLIC_APOLLO_URI,
  },
};