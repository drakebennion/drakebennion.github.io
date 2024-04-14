const STORAGE_KEY = "meeting-tracker";

const newMeetingFormEl = document.getElementsByTagName("form")[0];
const dateInputEl = document.getElementById("date");
const nameInputEl = document.getElementById("appointee-name");
const notesInputEl = document.getElementById("appointee-notes");
const pastMeetingsContainerEl = document.getElementById("past-meetings");

renderPastMeetings();

newMeetingFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const date = dateInputEl.value;
    const name = nameInputEl.value;
    const notes = notesInputEl.value;

    // todo: form validation + error handling

    storeNewMeeting(date, name, notes);

    renderPastMeetings();

    newMeetingFormEl.reset();
});

function storeNewMeeting(date, name, notes) {
    const meetings = getAllStoredMeetings();

    meetings.push({ date, name, notes });

    meetings.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
}

function getAllStoredMeetings() {
    const data = window.localStorage.getItem(STORAGE_KEY);

    const meetings = data ? JSON.parse(data) : [];

    return meetings;
}

function renderPastMeetings() {
    const meetings = getAllStoredMeetings();

    if (meetings.length === 0) {
        return;
    }

    pastMeetingsContainerEl.innerHTML = "";

    const pastMeetingsHeader = document.createElement("h2");
    pastMeetingsHeader.textContent = "Past meetings";

    const pastMeetingsList = document.createElement("ul");
    meetings.forEach((meeting) => {
        const meetingEl = document.createElement("li");
        meetingEl.textContent = `${formatDate(meeting.date)}: ${meeting.name}. ${meeting.notes}`;
        pastMeetingsList.appendChild(meetingEl);
    });

    pastMeetingsContainerEl.appendChild(pastMeetingsHeader);
    pastMeetingsContainerEl.appendChild(pastMeetingsList);
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}