import clock from 'clock';
import * as document from 'document';

clock.granularity = 'minutes'; // seconds, minutes, hours

const clockLabel = document.getElementById('clock-label');

clock.addEventListener('tick', (evt) => {
  let clockhours = evt.date.getHours();
  let clockminutes = evt.date.getMinutes();
  if (clockhours < 10) {
    clockhours = '0' + clockhours;
  }
  if (clockminutes < 10) {
    clockminutes = '0' + clockminutes;
  }
  clockLabel.text = clockhours + ':' + clockminutes;
});

const datum = document.getElementById('datum');

clock.addEventListener('tick', (evt) => {
  datum.text = evt.date;
});

const date1 = new Date();
console.log(date1.getUTCDay());

/*
let u=0;
if (u>0) {
  console.log(item.days.value(id[u]));
  u++;
}
else {
  console.log("oeche");
}
});

const datum = document.getElementById('datum');

clock.addEventListener('tick', (evt) => {
datum.text = evt.date;
});

const date1= new Date;
console.log(date1.getUTCDay());
*/
