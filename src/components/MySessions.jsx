import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const MySessions = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/sessions/my-sessions", {
            headers: { Authorization: token },
        }).then(res => setSessions(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h2>My Sessions</h2>
            <ul>
                {sessions.map(s => (
                    <li key={s._id}>
                        {s.title} [{s.status}]
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MySessions;