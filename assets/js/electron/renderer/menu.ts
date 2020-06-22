import { app, Menu, MenuItemConstructorOptions, shell } from 'electron';

const template: MenuItemConstructorOptions[] = [
	{
		label: 'Items',
		submenu: [
			{
				label: 'Add Contact',
				accelerator: 'CmdOrCtrl+O'
				//click: window.newItem
			},
			{
				label: 'Delete Item',
				accelerator: 'CmdOrCtrl+Backspace'
				//click: window.deleteItem
			}
		]
	},
	{
		role: 'editMenu'
	},
	{
		role: 'windowMenu'
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click: () => {
					shell
						.openExternal('https://github.com/bertolero/polymer3-trainning-2')
						.catch(error => console.error('Error clicking on Learn more', error));
				}
			}
		]
	}
];

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

export function customMenu() {
	const templateMenu =  Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(templateMenu);
}
