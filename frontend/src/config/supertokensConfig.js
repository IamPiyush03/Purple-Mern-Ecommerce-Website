import React from 'react';

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "Purple Mern Website",
        apiDomain: "http://localhost:5000",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

