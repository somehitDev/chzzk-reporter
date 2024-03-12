const xlsx = require("xlsx");
const path = require("path");


function createSheetFromData(lives, createFilter, headers) {
    const ws = xlsx.utils.json_to_sheet(lives);
    if (createFilter) {
        ws["!autofilter"] = { ref: "A1:ZZ1" };
    }

    // stretch width to content
    const columnWidth = headers.map(() => 0);
    for (var live of lives) {
        Object.keys(live).forEach((key, idx) => {
            if (columnWidth[idx] < live[key].length) {
                columnWidth[idx] = live[key].length;
            }
        });
    }
    ws["!cols"] = columnWidth.map((width) => { return { width: width + 10 } });

    return ws;
}

module.exports = {
    report(lives, reportDir, divideByCategory, createFilter = true, openReport = false) {
        const reportFile = path.join(reportDir, `${require("moment")().format("YYYY.MM.DD.HH.00.00")}.xlsx`);

        // get json format report
        const jsonContent = {
            size: lives.length,
            lives: lives.map((live) => {
                return {
                    streamer: live.channel.channelName,
                    title: live.liveTitle,
                    category: live.liveCategoryValue,
                    viewers: live.concurrentUserCount,
                    startTime: live.livePlayback.live.start,
                    url: `https://chzzk.naver.com/live/${live.channel.channelId}`
                }
            })
        };

        if (jsonContent.size > 0) {
            const wb = xlsx.utils.book_new();
            const headers = Object.keys(jsonContent.lives[0]);

            if (divideByCategory) {
                // split by categories
                const livesByCategory = {};
                for (var live of jsonContent.lives) {
                    const category = live.category;
                    delete live.category;

                    if (!Object.keys(livesByCategory).includes(category)) {
                        livesByCategory[category] = [];
                    }

                    livesByCategory[category].push(live);
                }

                // create sheets by categories
                for (var category of Object.keys(livesByCategory).sort()) {
                    xlsx.utils.book_append_sheet(wb, createSheetFromData(livesByCategory[category], createFilter, headers), category);
                }
            }
            else {
                // create single sheet
                xlsx.utils.book_append_sheet(wb, createSheetFromData(jsonContent.lives, createFilter, headers), "report");
            }

            // write to file
            xlsx.writeFile(wb, reportFile);

            // open report if flag
            if (openReport) {
                if (process.platform == "win32" || process.platform == "win64") {
                    exec(`start ${reportFile}`);
                }
                else if (process.platform == "darwin") {
                    exec(`open ${reportFile}`);
                }
                else {
                    exec(`xdg-open ${reportFile}`);
                }
            }
        }
    }
};
