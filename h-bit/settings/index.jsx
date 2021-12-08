registerSettingsPage((/* { settings } */) => (
  <Page>
    <Section title="My reminders">
      <Text>U don't have any reminders yet, press + to add one</Text>
    </Section>
    <Section title="Pick a letter">
      <Select
        label="Select a letter"
        settingsKey="letter"
        options={[
          { name: 'A', value: 'A' },
          { name: 'B', value: 'B' },
          { name: 'C', value: 'C' },
          { name: 'D', value: 'D' },
          { name: 'E', value: 'E' },
          { name: 'F', value: 'F' },
          { name: 'G', value: 'G' },
          { name: 'H', value: 'H' },
        ]}
      />
    </Section>
    // hieronder staat code voor die color switches
    <Section
title={<Text bold align="center">Demo Settings</Text>}>
// dit is die toggle switch misschien komt deze later nog van pas
<Toggle
settingsKey="toggle"
label="Reminder 1"
/>
<ColorSelect
settingsKey="color"
colors={[
{color: 'tomato'},
{color: 'sandybrown'},
{color: 'gold'},
{color: 'aquamarine'},
{color: 'deepskyblue'},
{color: 'plum'}
]}
/>
</Section>
</Page>
));
