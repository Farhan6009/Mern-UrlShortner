require("dotenv").config();
const express = require("express")
const app = express();
var cors = require('cors')

require("./db/conn")
const ShortUrl = require("./models/url")
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    try {
        const data = await ShortUrl.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
})
app.post("/shortUrl", async (req, res) => {
    try {
        const full = req.body.full;
        const urldata = await new ShortUrl({ full })
        const data = await urldata.save();
        console.log(data);
        res.status(201).redirect("/");

    } catch (error) {
        res.status(400).send(error);
    }
})
app.get('/:shortUrl', async (req, res) => {
    const short = req.params.shortUrl;
    const shortUrl = await ShortUrl.findOne({ short });
    if (!shortUrl) {
        console.error("Url not found");
    } else {
        shortUrl.clicks++;
        shortUrl.save();
        res.status(201).send(shortUrl.full);
    }

})

app.listen(port, () => {
    console.log(`connection to the port ${port}`);
})