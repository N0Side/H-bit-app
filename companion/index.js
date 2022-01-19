import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';

/* Settings */
function sendSettings() {
  const settings = {
    items: settingsStorage.getItem('items')
      ? JSON.parse(settingsStorage.getItem('items')).map((item) => ({
          name: item.name ? JSON.parse(item.name).name : '',
          letter: item.letter ? JSON.parse(item.letter).value : '',
          color: item.color ? JSON.parse(item.color) : '',
          days: item.days ? JSON.parse(item.days).value : '',
          hour: item.hour ? JSON.parse(item.hour).value : '',
          minutes: item.minutes ? JSON.parse(item.minutes).value : '',
        }))
      : [],
  };

  outbox
    .enqueue('settings.cbor', cbor.encode(settings))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

settingsStorage.addEventListener('change', sendSettings);
