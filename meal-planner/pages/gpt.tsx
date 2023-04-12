import axios from "axios";
import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    organization: "YOUR_ORG_ID",
    apiKey: process.env.OPENAI_API_KEY,
});

const AskChatGPT = () => {
    const openai = new OpenAIApi(configuration);

    return ( 
			
			""
		);
}

export default AskChatGPT