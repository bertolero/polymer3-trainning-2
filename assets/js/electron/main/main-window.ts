import { BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import { checkForUpdates } from './updater';

export class MainWindow {

	constructor(private readonly indexPath: string) {
	}

	create() {

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

		mainWindow.loadURL(`file://${this.indexPath}`).catch(error => {
			throw error;
		});

		mainWindow.webContents.openDevTools();

		state.manage(mainWindow);

		mainWindow.on('close', () => {
			mainWindow = null;
		});
	}
}
