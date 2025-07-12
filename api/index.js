const app = require('express')();
const { VercelProxy } = require('vercel-netlify-cms-github-oauth-provider');

const config = {
  oauth_client_id: process.env.OAUTH_CLIENT_ID,
  oauth_client_secret: process.env.OAUTH_CLIENT_SECRET,
};

module.exports = VercelProxy(app, config); 