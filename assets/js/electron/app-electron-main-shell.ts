import { app, BrowserWindow } from 'electron';
import { CustomMenu } from './main/custom-menu';
import { MainWindow } from './main/main-window';
import path from "path";

app.whenReady().then(() => {
	const mainWindow: MainWindow = new MainWindow(path.join(__dirname, 'index.html'));
	const customMenu: CustomMenu = new CustomMenu();

	mainWindow.create();
	customMenu.create();

	if (BrowserWindow.getAllWindows().length === 0) {
		mainWindow.create();
		customMenu.create();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
