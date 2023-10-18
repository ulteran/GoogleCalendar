function menuButton() {
  SpreadsheetApp.getUi().createMenu('Google calendar')
  .addItem('📅 Generate all events', 'createMultipleEvents')
  .addItem('📅 Generate current row event', 'createCurrentRowEvent')
  .addSeparator()
  .addItem('❌ Delete all events', 'deleteAllEvents')
  .addItem('❌ Delete current row event', 'deleteCurrentRowEvent')
  .addToUi();
}

function createEvent(row) {
  const CREATED = SHEET.getRange(row, 7).getValue();
  if (CREATED != 'Event created') {
    const EVENT_NAME = SHEET.getRange(row, 1).getValue();
    const STARTING_TIME = SHEET.getRange(row, 2).getValue();
    const ENDING_TIME = SHEET.getRange(row, 3).getValue();
    const LOCATION = SHEET.getRange(row, 5).getValue();
    var event;
    var eventId;
    try {
      event = CALENDAR.createEvent(EVENT_NAME, STARTING_TIME, ENDING_TIME,
        { location: LOCATION, guests: null, sendIndvites: false });
      eventId = event.getId();
    } finally {
      SHEET.getRange(row, 7).setValue('Event created');
      SHEET.getRange(row, 8).setValue(eventId);
      Logger.log('Event ID: ' + eventId);
      return 'Succesfull';
    }
  }
}

function deleteEvent(row) {
  const EVENT_ID = SHEET.getRange(row, 8).getValue();
  const STATUS = SHEET.getRange(row, 7).getValue();
  if (STATUS != 'Event deleted') {
    const EVENT = CALENDAR.getEventById(EVENT_ID);
    try {
      EVENT.deleteEvent();
    } finally {
      SHEET.getRange(row, 7).setValue('Event deleted');
      SHEET.getRange(row, 8).clearContent();
      UI.alert("Event was successfully deleted");
    }
  }
}