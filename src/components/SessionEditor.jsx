import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

const SessionEditor = ({ sessionId }) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [jsonUrl, setJsonUrl] = useState("");
    const [id, setId] = useState(sessionId || null);
    const [message, setMessage] = useState(null);
    const timeoutRef = useRef(null);
    const token = localStorage.getItem("token");

    const hasContent = () => title.trim() || tags.trim() || jsonUrl.trim();

    const autoSave = () => {
        if (!hasContent()) return;
        const payload = {
            title,
            tags: tags.split(",").map(tag => tag.trim()),
            json_file_url: jsonUrl,
            id,
        };
        axios.post("http://localhost:5000/api/sessions/save-draft", payload, {
            headers: { Authorization: token },
        }).then(res => {
            setId(res.data._id);
            setMessage("Draft auto-saved");
        }).catch(err => console.error("Auto-save error:", err));
    };

    const handleSaveDraft = () => {
        if (!hasContent()) {
            setMessage("Draft must have at least one non-empty field");
            return;
        }
        autoSave();
        setMessage("Draft saved manually");
    };

    const handlePublish = () => {
        axios.post("http://localhost:5000/api/sessions/publish", { id }, {
            headers: { Authorization: token },
        }).then(() => setMessage("Session published successfully!"))
            .catch(err => console.error("Publish error:", err));
    };

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (hasContent()) autoSave();
        }, 3000);

        return () => clearTimeout(timeoutRef.current);
    }, [title, tags, jsonUrl]);

    return (
        <div className="container">
            <h2>Session Editor</h2>
            {message && <p style={{ color: message.includes("successfully") ? "green" : "orange" }}>{message}</p>}
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
            <input placeholder="JSON File URL" value={jsonUrl} onChange={e => setJsonUrl(e.target.value)} />
            <button onClick={handleSaveDraft}>Save Draft</button>
            <button onClick={handlePublish}>Publish</button>
            <p>Draft auto-saves after 3s of inactivity</p>
        </div>
    );
};

export default SessionEditor;