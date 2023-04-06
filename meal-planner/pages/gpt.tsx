import axios from "axios";
import React, { useState } from "react";

export default function AskGPT() {
    
    // axios.post('https://api.openai.com/v1/competions', {
    //     prompt: '',

    //     temperature: 2.0
    // }, headers
    // ).then(res)

    const [newQuestion, setNewQuestion] = useState('');
    const [gptArray, setGptArray] = useState([]);

    // Handlers

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {

    }

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
    }


}