const SuperTokens = require("supertokens-node");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const Session = require("supertokens-node/recipe/session");

SuperTokens.init({
  framework: "express", 
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI || "https://try.supertokens.com",
  },
  appInfo: {
    appName: "Purple Mern Website",
    apiDomain: process.env.API_DOMAIN || "http://localhost:5000",
    websiteDomain: process.env.WEBSITE_DOMAIN || "http://localhost:5173",
  },
  recipeList: [
    EmailPassword.init(), // Initialize the EmailPassword recipe for authentication
    Session.init(), // Initialize the Session recipe for user sessions
  ],
});
