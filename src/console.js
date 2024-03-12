const schedule = require("node-schedule");
const utils = require("./utils.js");
const configs = require("../configs.json");

const client = require("./connection.js").connect(configs.nidAuth, configs.nidSession);
const reportDir = utils.reportDir(configs.reportDir ?? "./reports");

async function update() {
    //= get all lives from keyword
    const lives = await utils.getLivesByKeywords(client, configs.keywords ?? [ "talk" ], true);

    //= create report
    require("./reporter.js").report(lives, reportDir, configs.divideByCategory ?? false, configs.createFilter ?? false, configs.openReport ?? false);
}

schedule.scheduleJob(`0 0 */${configs.interval ?? 1} * * *`, update);
// update();

console.log("press ctrl+c to exit...");
process.on("SIGINT", () => {
    schedule.gracefulShutdown().then(() => { process.exit(0) });
});
