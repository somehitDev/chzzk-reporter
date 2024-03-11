const path = require("path");

module.exports = {
    report(lives, reportDir, space = 4, writeToFile = true) {
        // make report
        const output = {
            size: lives.length,
            lives: lives.map((live) => {
                return {
                    streamer: live.channel.channelName,
                    title: live.liveTitle,
                    viewers: live.concurrentUserCount,
                    startTime: live.livePlayback.live.start,
                    url: `https://chzzk.naver.com/live/${live.channel.channelId}`
                }
            })
        };

        // for (var live of lives) {
        //     // refer to `help.js` for details
        //     output.lives.push({
        //         streamer: live.channel.channelName,
        //         title: live.liveTitle,
        //         viewers: live.concurrentUserCount,
        //         startTime: live.livePlayback.live.start,
        //         url: `https://chzzk.naver.com/live/${live.channel.channelId}`
        //     });
        // }

        if (writeToFile) {
            // write as json
            require("fs").writeFileSync(
                path.join(reportDir, `${require("moment")().format("YYYY.MM.DD.HH.00.00")}.json`),
                JSON.stringify(output, null, space)
            );
        }
        else {
            return output;
        }
    }
};
