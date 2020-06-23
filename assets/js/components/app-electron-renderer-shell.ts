import { ipcRenderer } from 'electron';
import './app-polymer';

ipcRenderer.on('open-add-contact', (e, data) => {
	console.debug(e);
	dispatchCustomEvent('on-electron-open-add-contact-menu-click');
});

ipcRenderer.on('close-add-contact', (e, data) => {
	console.debug(e);
	dispatchCustomEvent('on-electron-close-add-contact-menu-click');
});

function dispatchCustomEvent(eventName: string) {
	const enableAddContactEvent = new CustomEvent<string>(eventName, {
		detail: eventName
	});
	console.debug(`electron menu trigger ${eventName} event`);
	window.dispatchEvent(enableAddContactEvent);
}
