import { gettext } from "i18n";
const list = [
  { name: '😴', value: '😴' },
  { name: '💊', value: '💊' },
  { name: '🏃🏻', value: '🏃🏻' },
  { name: '💪🏻', value: '💪🏻' },
  { name: '🐶', value: '🐶' },
  { name: '🍎', value: '🍎' },
  { name: '💦', value: '💦' },
];

const days = [
  { name: gettext("mon"), value: '1' },
  { name: gettext("tue"), value: '2' },
  { name: gettext("wed"), value: '3' },
  { name: gettext("thu"), value: '4' },
  { name: gettext("fri"), value: '5' },
  { name: gettext("sat"), value: '6' },
  { name: gettext("sun"), value: '7' },
];
const colors = [
  { color: '#DC143C' },
  { color: '#1B8900' },
  { color: '#0146CD' },
  { color: '#FFA500' },
  { color: '#FF5C00' },
  { color: '#039898' },
];


/* Edit Page (for complex list items) */
function renderEditPage(props) {
  return (
    <Page>
      <Section>
        <Button
          label= {gettext("back")}
          onClick={() => {
            props.settingsStorage.setItem('itemAdding', 'false');
          }}
        />
      </Section>
      <Section title="Details">
        <TextInput
          settingsKey="itemName"
          label= {gettext("name")}
          placeholder="Type something"
        />
        <TextInput
          settingsKey="itemLetter"
          label= {gettext("icon")}
          placeholder= {gettext("type")}
          onAutocomplete={(value) =>
            list.filter(
              (option) =>
                option.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            )
          }
        />

        <ColorSelect  title= {gettext("color")} settingsKey="itemColor" colors={colors} />

      </Section>
      <Section title= {gettext("when")}>
              <TextInput
          settingsKey="itemDays"
          label= {gettext("day")}
          placeholder= {gettext("type")}
          onAutocomplete={(value) =>
            days.filter(
              (option) =>
                option.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            )
          }

        />
        </Section>
        <Section title= {gettext("time")}>
              <Text> {gettext("hour")}:                   {props.settingsStorage.getItem('sliderHour')}</Text>
      <Slider
        settingsKey="sliderHour"
        min="0"
        max="23"
        step="1"
        defaultValue="12"
        onChange={value => props.settingsStorage.setItem('hour', value)}
                      />
      <Text> {gettext("minutes")}:                {props.settingsStorage.getItem('sliderMinutes')}</Text>
      <Slider
        settingsKey="sliderMinutes"
        min="0"
        max="60"
        step="1"
        defaultValue="30"
        onChange={value => props.settingsStorage.setItem('minutes', value)}
            />

      </Section>
      <Section >
        <Button
          label= {gettext("save")}
          onClick={() => {
            // get current item list
            let items = [];
            if (
              props.settings.items &&
              JSON.parse(props.settings.items).length
            ) {
              items = JSON.parse(props.settings.items);
            }

            // generate new item
            if (props.settings.itemEditing === 'false') {
              const item = {
                id: `${new Date().getTime()}-${Math.random()
                  .toString(36)
                  .substring(7)}`, // random id
                name: props.settings.itemName,
                letter: props.settings.itemLetter,
                color: props.settings.itemColor,
                days: props.settings.itemDays,
                hour: props.settings.sliderHour,
                minutes: props.settings.sliderMinutes,
              };

              // add item
              items.push(item);

              // editing
            } else {
              // generate item with existing id
              const item = {
                id: props.settings.itemEditing,
                name: props.settings.itemName,
                letter: props.settings.itemLetter,
                color: props.settings.itemColor,
                days: props.settings.itemDays,
                hour: props.settings.sliderHour,
                minutes: props.settings.sliderMinutes,
              };

              // find current item
              const currentItem = items.find(
                (i) => i.id === props.settings.itemEditing,
              );

              // remove current item when found
              if (currentItem) {
                items[items.indexOf(currentItem)] = item;
              }
            }

            // save items
            props.settingsStorage.setItem('items', JSON.stringify(items));

            // back to main page
            props.settingsStorage.setItem('itemAdding', 'false');

          }}
        />
        {props.settings.itemEditing !== 'false' && (
          <Button
            label= {gettext("delete")}
            onClick={() => {
              // get current item list
              let items = [];
              if (
                props.settings.items &&
                JSON.parse(props.settings.items).length
              ) {
                items = JSON.parse(props.settings.items);
              }

              // find current item
              const currentItem = items.find(
                (item) => item.id === props.settings.itemEditing,
              );

              // remove current item when found
              if (currentItem) {
                items.splice(items.indexOf(currentItem), 1);
              }

              // save items
              props.settingsStorage.setItem('items', JSON.stringify(items));

              // back to main page
              props.settingsStorage.setItem('itemAdding', 'false');
            }}
          />
        )}
        <Button
          label= {gettext("cancel")}
          onClick={() => {
            props.settingsStorage.setItem('itemAdding', 'false');
          }}
        />
      </Section>
    </Page>
  );
}

/* Main Settings Page */
function renderMainPage(props) {
  let items = null;

  if (props.settings.items && JSON.parse(props.settings.items).length) {
    items = JSON.parse(props.settings.items).map((item) => (
      <Button
        key={item.id}
        label={JSON.parse(item.name).name}
        onClick={() => {
          // set default values
          props.settingsStorage.setItem('itemName', item.name);
          props.settingsStorage.setItem('itemLetter', item.letter);
          props.settingsStorage.setItem('itemColor', item.color);
          props.settingsStorage.setItem('itemDays', item.days);
          props.settingsStorage.setItem('sliderHour', item.hour);
          props.settingsStorage.setItem('sliderMinutes', item.minutes);

          // set itemAdding so we can switch views
          props.settingsStorage.setItem('itemAdding', 'true');

          // set editing id, so we can show delete button there
          props.settingsStorage.setItem('itemEditing', item.id);
        }}
      />
    ));
  } else {
    items = <Text>{gettext("begin")}</Text>;
  }

  return (
    <Page>


      <Section title= {gettext("rem")}>
        {items}
        <Button
          label= {gettext("item")}
          onClick={() => {
            // set default values
            props.settingsStorage.setItem('itemName', '');
            props.settingsStorage.setItem('itemLetter', '');
            props.settingsStorage.setItem('itemColor', '');
            props.settingsStorage.setItem('itemDays', '');
            props.settingsStorage.setItem('sliderHour', '');
            props.settingsStorage.setItem('sliderMinutes', '');

            // set itemAdding so we can switch views
            props.settingsStorage.setItem('itemAdding', 'true');

            // set editing false, so we don't show delete button there
            props.settingsStorage.setItem('itemEditing', 'false');
          }}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage((props) => {
  let result = renderMainPage;

  if (props.settings.itemAdding === 'true') result = renderEditPage;

  return result(props);
});
