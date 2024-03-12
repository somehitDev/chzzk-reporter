const { app, BrowserWindow } = require("electron");


app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 400, height: 220,
        resizable: false,
        title: "CHZZK Reporter(Config)",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    });

    win.loadFile("src/dist/index.html");
    // win.webContents.openDevTools();
});

app.on("window-all-closed", () => {
    app.quit();
});
