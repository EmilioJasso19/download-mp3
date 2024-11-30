const readline = require("readline");
require("dotenv").config();
const { ValidateVideoIDHandler } = require("./ValidateVideoIdHandler");
const { FetchMp3DataHandler } = require("./FetchMp3DataHandler");
const { ParseYoutubeLinkHandler } = require("./ParseYoutubeLinkHandler");
const { DownloadMp3Handler } = require("./DownloadMp3Handler");
const {input} = require("readline");

const parseLinkHandler = new ParseYoutubeLinkHandler();
const validateVideoIDHandler = new ValidateVideoIDHandler();
const fetchHandler = new FetchMp3DataHandler();
const downloadHandler = new DownloadMp3Handler();

parseLinkHandler
    .setNext(validateVideoIDHandler)
    .setNext(fetchHandler)
    .setNext(downloadHandler)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log("Enter a yt video link")

rl.on("line", async (input) => {
    await parseLinkHandler.handle(input);
    rl.close();
})