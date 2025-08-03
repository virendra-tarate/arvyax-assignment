import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

const SessionEditor = ({ sessionId }) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [jsonUrl, setJsonUrl] = useState("");
    const [id, setId] = useState(sessionId || null);
    const timeoutRef = useRef(null);
    const token = localStorage.getItem("token");

    const autoSave = () => {
        const payload = {
            title,
            tags: tags.split(",").map(tag => tag.trim()),
            json_file_url: jsonUrl,
            id,
        };
        axios.post("http://localhost:5000/api/sessions/save-draft", payload, {
            headers: { Authorization: token },
        }).then(res => setId(res.data._id))
            .catch(err => console.error("Auto-save error:", err));
    };

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => autoSave(), 5000);
    }, [title, tags, jsonUrl]);

    const handlePublish = () => {
        axios.post("http://localhost:5000/api/sessions/publish", { id }, {
            headers: { Authorization: token },
        });
    };

    return (
        <div className="container">
            <h2>Session Editor</h2>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
            <input placeholder="JSON File URL" value={jsonUrl} onChange={e => setJsonUrl(e.target.value)} />
            <button onClick={handlePublish}>Publish</button>
            <p>Auto-saving after 5s of inactivity...</p>
        </div>
    );
};

export default SessionEditor;