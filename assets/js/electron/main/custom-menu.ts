import { app, BrowserWindow, Menu, MenuItemConstructorOptions, shell } from 'electron';


export class CustomMenu {
	create() {

		const template: MenuItemConstructorOptions[] = [{
			label: 'Items',
			submenu: [{
				label: 'Open Add Contact',
				accelerator: 'CmdOrCtrl+O',
				click: () => {
					BrowserWindow.getAllWindows()[0].webContents.send('open-add-contact', {});
				}
			}, {
				label: 'Open Add Contact',
				accelerator: 'CmdOrCtrl+Backspace',
				click: () => {
					BrowserWindow.getAllWindows()[0].webContents.send('close-add-contact', {});
				}
			}]
		}, {
			role: 'editMenu'
		}, {
			role: 'windowMenu'
		}, {
			role: 'help',
			submenu: [{
				label: 'Learn More',
				click: () => {
					shell
						.openExternal('https://github.com/bertolero/polymer3-trainning-2')
						.catch(error => console.error('Error clicking on Learn more', error));
				}
			}]
		}];

		if (process.platform === 'darwin') {
			template.unshift({
				label: app.getName(),
				submenu: [
					{ role: 'about' },
					{ type: 'separator' },
					{ role: 'services' },
					{ type: 'separator' },
					{ role: 'hide' },
					{ role: 'hideOthers' },
					{ role: 'unhide' },
					{ type: 'separator' },
					{ role: 'quit' }
				]
			});
		}

		const templateMenu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(templateMenu);
	}
}


