//Need transpilation
import { app, BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import path from 'path';
import { checkForUpdates } from './main/updater';
import { customMenu } from './main/menu';

function createWindow() {

	setTimeout(checkForUpdates, 3000);

	const state = windowStateKeeper({
		defaultWidth: 800,
		defaultHeight: 850
	});

	let mainWindow: BrowserWindow | null = new BrowserWindow({
		x: state.x,
		y: state.y,
		width: state.width,
		height: state.height,
		minWidth: 350,
		minHeight: 300,
		maxWidth: 850,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`).catch(error => {
		throw error;
	});

	mainWindow.webContents.openDevTools();

	state.manage(mainWindow);

	mainWindow.on('close', () => {
		mainWindow = null;
	});
}

app.whenReady().then(() => {
	customMenu();
	createWindow();

	if (BrowserWindow.getAllWindows().length === 0) {
		customMenu();
		createWindow();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
