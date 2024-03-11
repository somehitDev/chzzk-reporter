const xlsx = require("xlsx");
const path = require("path");

module.exports = {
    report(lives, reportDir, createFilter = true) {
        // get json format report
        const jsonContent = require("./json.js").report(lives, reportDir, 4, false);

        if (jsonContent.size > 0) {
            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(jsonContent.lives);
            if (createFilter) {
                ws["!autofilter"] = { ref: "A1:ZZ1" };
            }

            // stretch width to content
            const headers = Object.keys(jsonContent.lives[0]);
            const columnWidth = headers.map(() => 0);
            for (var live of jsonContent.lives) {
                Object.keys(live).forEach((key, idx) => {
                    if (columnWidth[idx] < live[key].length) {
                        columnWidth[idx] = live[key].length;
                    }
                });
            }
            ws["!cols"] = columnWidth.map((width) => { return { width: width + 5 } });

            xlsx.utils.book_append_sheet(wb, ws, "report");
            xlsx.writeFile(
                wb,
                path.join(reportDir, `${require("moment")().format("YYYY.MM.DD.HH.00.00")}.xlsx`)
            );
        }

        // make report
    }
};
