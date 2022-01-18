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
  { name: 'Monday', value: 'Monday' },
  { name: 'Tuesday', value: 'Tuesday' },
  { name: 'Wednesday', value: 'Wednesday' },
  { name: 'Thursday', value: 'Thursday' },
  { name: 'Friday', value: 'Friday' },
  { name: 'Saturday', value: 'Saturday' },
  { name: 'Sunday', value: 'Sunday' },
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
      <Section title="Time">
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
