const { ChzzkClient } = require("chzzk");
const path = require("path");
const fs = require("fs");
const schedule = require("node-schedule");
const configs = require("../configs.json");

const client = new ChzzkClient({
    nidAuth: configs.nidAuth,
    nidSession: configs.nidSession
});
const reportDir = path.resolve(configs.reportDir ?? "./reports");
if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
}

async function update() {
    //= get all lives from keyword
    var lives = [];
    var offset = null;
    while (true) {
        try {
            var resp;
            if (offset) {
                resp = await client.search.lives(configs.keyword ?? "talk", { size: 10, offset: offset });
            }
            else {
                resp = await client.search.lives(configs.keyword ?? "talk");
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
    // sort by viewers(desc)
    lives.sort(( a, b ) => {
        return b.concurrentUserCount - a.concurrentUserCount;
    });

    //= create report
    const reportType = configs.reportType ?? "json";
    if (reportType == "json") {
        require("./reporters/json.js").report(lives, reportDir);
    }
    else if (reportType == "csv") {
        require("./reporters/csv.js").report(lives, reportDir);
    }
    else if (reportType == "xlsx") {
        require("./reporters/xlsx.js").report(lives, reportDir);
    }
}

schedule.scheduleJob(`0 0 */${configs.interval ?? 1} * * *`, update);

console.log("press ctrl+c to exit...");
process.on("SIGINT", () => {
    schedule.gracefulShutdown().then(() => { process.exit(0) });
});
