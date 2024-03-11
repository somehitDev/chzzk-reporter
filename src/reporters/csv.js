const path = require("path");

module.exports = {
    report(lives, reportDir, separater = ",") {
        // get json format report
        const jsonContent = require("./json.js").report(lives, reportDir, 4, false);

        if (jsonContent.size > 0) {
            const headers = Object.keys(jsonContent.lives[0]);
            const output = [
                headers.join(separater)
            ];

            // make report
            for (var live of jsonContent.lives) {
                const row = [];
                for (var header of headers) {
                    row.push(live[header]);
                }

                output.push(row.join(separater));
            }
    
            // write as csv
            require("fs").writeFileSync(
                path.join(reportDir, `${require("moment")().format("YYYY.MM.DD.HH.00.00")}.csv`),
                output.join("\n")
            );
        }
    }
};
