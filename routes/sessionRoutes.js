const express = require("express");
const Session = require("../models/Session");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    const sessions = await Session.find({ status: "published" });
    res.json(sessions);
});

router.get("/my-sessions", auth, async (req, res) => {
    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
});

router.get("/my-sessions/:id", auth, async (req, res) => {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
    res.json(session);
});

router.post("/save-draft", auth, async (req, res) => {
    const { title, tags, json_file_url, id } = req.body;
    let session;
    if (id) {
        session = await Session.findOneAndUpdate(
            { _id: id, user_id: req.user.id },
            { title, tags, json_file_url, updated_at: new Date() },
            { new: true }
        );
    } else {
        session = await Session.create({
            user_id: req.user.id,
            title,
            tags,
            json_file_url,
            status: "draft"
        });
    }
    res.json(session);
});

router.post("/publish", auth, async (req, res) => {
    const { id } = req.body;
    const session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        { status: "published", updated_at: new Date() },
        { new: true }
    );
    res.json(session);
});

module.exports = router;