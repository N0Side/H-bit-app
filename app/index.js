import clock from 'clock';
import * as document from 'document';

clock.granularity = 'minutes'; // seconds, minutes, hours

const clockLabel = document.getElementById('clock-label');
const datum = document.getElementById('datum');

clock.addEventListener('tick', (evt) => {
  clockLabel.text = evt.date.getHours() + ':' + evt.date.getMinutes();
});

clock.addEventListener('tick', (evt) => {
  datum.text = evt.date;
});
