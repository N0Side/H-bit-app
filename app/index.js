import clock from 'clock';
import * as document from 'document';
//import { vibration } from "haptics"; //staat als comment want geeft error in commit
//import * as settings from "settingsStorage"; // it is imported, but could not be resolved + compile failed

clock.granularity = 'minutes'; // seconds, minutes, hours

const clockLabel = document.getElementById('clock-label');
const datum = document.getElementById('datum');
const date1 = new Date();
//const items = [];
const myRect = document.getElementById('myRect');
const icon = document.getElementById('icon');
console.log(date1.getUTCDay());

clock.addEventListener('tick', (evt) => {
  var chours = evt.date.getHours();
  var cminutes = evt.date.getMinutes();
  if (chours < 10) {
    var clockhours = '0' + chours;
  } else {
    clockhours = chours;
  }
  if (cminutes < 10) {
    var clockminutes = '0' + cminutes;
  } else {
    clockminutes = cminutes;
  }
  clockLabel.text = clockhours + ':' + clockminutes;
  datum.text = evt.date.toDateString();

  /*
//deze functie zou ervoor moeten zorgen dat de kleuren en iconen van de reminders op het juiste moment worden weergegeven
const items = settings.getItem('items')

items.forEach((item, id) => {
if (item.days.value===date1.getUTCDay() && item.hour===chours && item.minutes===cminutes) {
  //change color myRect
    myRect.style.fill= color; // of item.color

  //Icon
   icon.text= letter; // of item.letter

  vibration.start("bump");

}

});
*/
});
// terug naar oude versie aka zelfde waarden als in index.view
myRect.addEventListener('click', () => {
  myRect.style.fill = 'darkcyan';
  icon.text = '';
});
