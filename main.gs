// Function for creating events in google calendar

const CALENDAR = CalendarApp.getCalendarById('8c1470287f6321a6119607ff746b460b9d9de92de3dfecf568cd1d09aa653148@group.calendar.google.com');
const SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet();
const SHEET = SPREADSHEET.getActiveSheet();
const UI = SpreadsheetApp.getUi();

function createMultipleEvents() {
  var eventsCreated = 0;
  for (var i = 2; i <= SHEET.getLastRow(); i++) {
    const CREATION_STATUS = createEvent(i);
    if (CREATION_STATUS == 'Succesfull') eventsCreated++
  }
  UI.alert(eventsCreated + " events were successfully created")
}

function createCurrentRowEvent() {
  const ACTIVE_ROW = SHEET.getCurrentCell().getRow();
  const CREATION_STATUS = createEvent(ACTIVE_ROW);
  if (CREATION_STATUS == 'Succesfull') UI.alert('The event was succesfully created')
  else UI.alert('The event was not created');
}

function deleteAllEvents() {
  var eventsDeleted = 0;
  const STARTING_TIME = new Date(2020, 0, 1);
  const ENDING_TIME = new Date(2024, 0, 1);
  const EVENTS = CALENDAR.getEvents(STARTING_TIME, ENDING_TIME);
  Logger.log(EVENTS);
  EVENTS.forEach(event => {
    try{
      event.deleteEvent();
    } finally {
      eventsDeleted++;
    }
  })
  SHEET.getRange(2, 7, SHEET.getLastRow() - 1).setValue('Event deleted');
  UI.alert(eventsDeleted + " events were successfully deleted");
}

function deleteCurrentRowEvent() {
  const ACTIVE_ROW = SHEET.getCurrentCell().getRow();
  deleteEvent(ACTIVE_ROW);   
}