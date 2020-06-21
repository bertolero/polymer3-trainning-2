import { BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import logger from 'electron-log';

logger.transports.file.level = 'debug';

autoUpdater.logger = logger;

autoUpdater.autoDownload = false;

export function checkForUpdates() {
	autoUpdater.checkForUpdates().catch();

	autoUpdater.on('update-available', () => {

		dialog.showMessageBox(new BrowserWindow(), {
			type: 'info',
			title: 'Update available',
			message: 'A new version of Readit is available. Do you want to update now??',
			buttons: ['Update', 'No']
		}).then(userAction => {
			if (userAction.response === 0) {
				autoUpdater.downloadUpdate().catch();
			}
		});
	});

	autoUpdater.on('update-downloaded', () => {
		dialog.showMessageBox(new BrowserWindow(), {
			type: 'info',
			title: 'Update ready',
			message: 'Install and restart now?',
			buttons: ['Yes', 'Later']
		}).then(userAction => {
			if (userAction.response === 0) {
				autoUpdater.quitAndInstall(false, true);
			}
		});
	});
}
