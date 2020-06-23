import { ipcRenderer } from 'electron';
import './app-polymer';

ipcRenderer.on('open-add-contact', (e, data) => {
	console.debug(e);
	console.debug('open-add-contact renderer');
});
