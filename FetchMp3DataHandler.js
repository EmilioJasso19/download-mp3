const Handler = require("./Handler");
const fetch = require("node-fetch");

// https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}

/*
"x-rapidapi-key": process.env.API_KEY,
"x-rapid-host": process.env.API_HOST,
*/

class FetchMp3DataHandler extends Handler{

    async handle(videoID) {
        const response = await fetch(
            `https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": process.env.API_KEY,
                    "x-rapid-host": process.env.API_HOST,
                }
            }
        );

        const data = await response.json();
        console.log(`Api response:`, data);

        if (data.status === "ok") {
            console.log(`Response status: ${data.status}`);
            return super.handle({
                title: data.title,
                link: data.link,
            })
        } else if (data.message === "in queue") {
            console.warn("video is in queue try again")
        } else {
            console.error(`Error`, data.message);
        }
    } catch (e) {
        console.error("Error fetching api data: ", e.message);
    }

}

module.exports = { FetchMp3DataHandler };