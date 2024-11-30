const Handler = require("./Handler");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const os = require("os");

class DownloadMp3Handler extends Handler{
    async handle(input) {
        const {title, link} = input

        try {
            console.log(`Downloading ${title} from ${link}`);
            const response = await fetch(link)
            const buffer = await response.buffer();

            const downloadDir = path.join(os.homedir(), "Downloads");
            const filepath = path.join(downloadDir, `${title}.mp3`)

            fs.writeFileSync(filepath, buffer);
            console.log(`Download completed`);
        } catch (e) {
            console.log("error downloading mp3 file: ", e.message);
        }
    }
}

module.exports = { DownloadMp3Handler };