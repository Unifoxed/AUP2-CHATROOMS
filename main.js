const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#000000',
        // In de film hebben ze vaak geen standaard Windows-randen
        // frame: false, // Haal de comment weg als je een echt 'raar' venster wilt
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Hier vertellen we Electron om je chat te laden
    // We gaan ervan uit dat je server draait op poort 3000
    win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});