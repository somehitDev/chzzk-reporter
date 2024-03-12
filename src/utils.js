const path = require("path");
const fs = require("fs");

async function getLivesByKeyword(client, keyword, sort = true) {
    var lives = [];
    var offset = null;
    while (true) {
        try {
            var resp;
            if (offset) {
                resp = await client.search.lives(keyword, { size: 10, offset: offset });
            }
            else {
                resp = await client.search.lives(keyword);
            }

            if (resp.size == 0) {
                break;
            }

            // concat lives(without duplicates)
            lives = lives.concat(resp.lives.filter(live => live.livePlayback.live.status == "STARTED" && !lives.includes(live)));

            offset = resp.nextOffset;
        }
        catch {
            break;
        }
    }

    if (sort) {
        // sort by viewers(desc)
        lives.sort(( a, b ) => {
            return b.concurrentUserCount - a.concurrentUserCount;
        });
    }

    return lives;
}

module.exports = {
    reportDir(rawReportDir, autoCreate = true) {
        const reportDir = path.resolve(rawReportDir);
        if (autoCreate && !fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }

        return reportDir;
    },
    getLivesByKeyword,
    async getLivesByKeywords(client, keywords = [], sort = true) {
        var lives = [];
        for (var keyword of keywords) {
            lives = lives.concat((await getLivesByKeyword(client, keyword, false)).filter(live => !lives.includes(live)));
        }

        if (sort) {
            // sort by viewers(desc)
            lives.sort(( a, b ) => {
                return b.concurrentUserCount - a.concurrentUserCount;
            });
        }

        return lives;
    }
};
