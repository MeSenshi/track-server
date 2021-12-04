const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(422).send({ err: "you must provide name and location" });
  }

  try {
    const track = new Track({
      name,
      location,
      userId: req.user._id,
    });

    await track.save();
    res.send(track);
  } catch (e) {
    res.status(422).send({ err: err.message });
  }
});

module.exports = router;
