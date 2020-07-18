import { BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import logger from 'electron-log';
import electronIsDev from 'electron-is-dev';
import * as path from 'path';

export class Updater {
	constructor() {
		logger.transports.file.level = 'debug';

		autoUpdater.logger = logger;

		autoUpdater.autoDownload = false;
	}

	public check(): void {
		if (electronIsDev === true) {
			autoUpdater.updateConfigPath = path.join(__dirname, '../../', 'config/updater', 'dev-app-update.yml');
		}

		autoUpdater.checkForUpdates().catch();

		autoUpdater.on('update-available', () => {
			dialog
				.showMessageBox(new BrowserWindow(), {
					type: 'info',
					title: 'Update available',
					message: 'A new version of Contact Book is available. Do you want to update now??',
					buttons: ['Update', 'No']
				})
				.then((userAction) => {
					if (userAction.response === 0) {
						autoUpdater.downloadUpdate().catch();
					}
				});
		});

		autoUpdater.on('update-downloaded', () => {
			dialog
				.showMessageBox(new BrowserWindow(), {
					type: 'info',
					title: 'Update ready',
					message: 'Install and restart now?',
					buttons: ['Yes', 'Later']
				})
				.then((userAction) => {
					if (userAction.response === 0) {
						autoUpdater.quitAndInstall(false, true);
					}
				});
		});
	}
}
