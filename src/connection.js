const { ChzzkClient } = require("chzzk");


module.exports = {
    connect(nidAuth, nidSession) {
        return new ChzzkClient({
            nidAuth: nidAuth,
            nidSession: nidSession
        });
    }
};
