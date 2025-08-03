import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/sessions")
            .then(res => setSessions(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h2>Published Wellness Sessions</h2>
            <ul>
                {sessions.map(session => (
                    <li key={session._id}>
                        <strong>{session.title}</strong> - Tags: {session.tags.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;