const express = require("express");
const router = express.Router();

const ShortURL = require("../models/urlSchema");

router.get("/", async (req, res) => {
  console.log("entered");
  const shorturls = await ShortURL.find();

  res.render("main.ejs", { shorturls: shorturls });
});

router.post("/shortUrls", async (req, res) => {
  console.log("post request entered");
  const url = req.body.full;
  const newShortURL = new ShortURL({
    full: url,
  });
  await newShortURL.save();
  console.log("Short URL Created", newShortURL);
  res.redirect("/main");
});
//  post end

//  view data
router.get("/shorturl/:shortUrl", async (req, res) => {
  console.log(req.params.shortUrl, "/shortget");
  const shortUrl = await ShortURL.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) {
    return res.sendStatus(404);
  }
  await shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await ShortURL.deleteOne({ _id: id });
    console.log("delte");
    res.redirect("/main");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
