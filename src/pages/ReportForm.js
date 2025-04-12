import React, { useState } from "react";
import { reportBettingApp } from "../services/api";

const Report = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await reportBettingApp(name, description);
            setMessage(`✅ Success: ${response.message}`);
        } catch (error) {
            setMessage(`❌ Error: ${error.response?.data?.detail || "Something went wrong"}`);
        }
    };

    return (
        <div>
            <h2>Report a Betting App</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>App Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Submit Report</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Report;
