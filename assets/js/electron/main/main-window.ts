import { BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import { Updater } from './updater';

export class MainWindow {
	private readonly updater: Updater;

	constructor(private readonly indexPath: string) {
		this.updater = new Updater();
	}

	create() {
		setTimeout(this.updater.check, 3000);

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

		mainWindow.loadURL(`file://${this.indexPath}`).catch((error) => {
			throw error;
		});

		mainWindow.webContents.openDevTools();

		state.manage(mainWindow);

		mainWindow.on('close', () => {
			mainWindow = null;
		});
	}
}
