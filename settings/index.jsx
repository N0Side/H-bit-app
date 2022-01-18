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
  { name: 'Monday', value: 'Mon' },
  { name: 'Tuesday', value: 'Tue' },
  { name: 'Wednesday', value: 'Wed' },
  { name: 'Thursday', value: 'Thu' },
  { name: 'Friday', value: 'Fri' },
  { name: 'Saturday', value: 'Sat' },
  { name: 'Sunday', value: 'Sun' },
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
          label="⏪ Back"
          onClick={() => {
            props.settingsStorage.setItem('itemAdding', 'false');
          }}
        />
      </Section>
      <Section title="Details">
        <TextInput
          settingsKey="itemName"
          label="Name"
          placeholder="Type something"
        />
        <TextInput
          settingsKey="itemLetter"
          label="Icon"
          placeholder="Type something"
          onAutocomplete={(value) =>
            list.filter(
              (option) =>
                option.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            )
          }
        />

        <ColorSelect  title="Colour" settingsKey="itemColor" colors={colors} />

      </Section>
      <Section title="When do you want to be reminded?">
              <TextInput
          settingsKey="itemDays"
          label="Day"
          placeholder="Type something"
          onAutocomplete={(value) =>
            days.filter(
              (option) =>
                option.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            )
          }

        />
        </Section>
        <Section title="Time">
        <Text> Hour:                   {props.settingsStorage.getItem('blah')}</Text>
        <Slider
          settingsKey="sliderHour"
          min="0"
          max="23"
          step="1"
          defaultValue="12"
          onChange={value => props.settingsStorage.setItem('blah', value)}
                        />
        <Text> Minutes:                {props.settingsStorage.getItem('bleh')}</Text>
        <Slider
          settingsKey="sliderMinutes"
          min="0"
          max="60"
          step="1"
          defaultValue="30"
          onChange={value => props.settingsStorage.setItem('bleh', value)}
        />

      </Section>
      <Section >
        <Button
          label="✅ Save"
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
            label="🗑 Delete"
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
          label="❌ Cancel"
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

          // set itemAdding so we can switch views
          props.settingsStorage.setItem('itemAdding', 'true');

          // set editing id, so we can show delete button there
          props.settingsStorage.setItem('itemEditing', item.id);
        }}
      />
    ));
  } else {
    items = <Text>Start by creating your first reminder</Text>;
  }

  return (
    <Page>


      <Section title="Create a reminder">
        {items}
        <Button
          label="➡️ Add item"
          onClick={() => {
            // set default values
            props.settingsStorage.setItem('itemName', '');
            props.settingsStorage.setItem('itemLetter', '');
            props.settingsStorage.setItem('itemColor', '');
            props.settingsStorage.setItem('itemDays', '');

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
