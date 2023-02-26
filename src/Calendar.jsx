import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
    const SCOPES = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
    const [events, setEvents] = useState(null);
    const CLIENT_ID = "438644935030-35rucc42om7je7h09lve4g2gaf798e44.apps.googleusercontent.com";
    const API_KEY = "AIzaSyC0Ir3ebKAlisngdG2I1Odvtugp_YkTM5s";

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = "https://apis.google.com/js/api.js";

        document.body.appendChild(script);
        script.addEventListener("load", () => {
            if (window.gapi) handleClientLoad();
        });
    }, []);
    const handleClientLoad = () => {
        window.gapi.load("client:auth2", initClient);
    };
    const openSignInPopup = () => {
        window.gapi.auth2.authorize(
            {client_id: CLIENT_ID, scope: SCOPES},
            (res) => {
                if(res) {
                    if(res.access_token)
                    localStorage.setItem("access_token", res.access_token);
                    window.gapi.client.load("calendar", "v3", listUpcomingEvents);
                }
            }
        );
    }
    const initClient = () => {
        if(!localStorage.getItem("access_token")) {
            openSignInPopup();
        } else {
            fetch(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    }
            )
            .then((res) => {
                if (res.status != 401) {
                    return res.json();
                } else{
                    localStorage.removeItem("access_token");
                    openSignInPopup();
                }
            })
            .then((data) => {
                if(data?.items){
                    setEvents(formatEvents(data.items));
                }
            });
        }
    };
    const listUpcomingEvents = () => {
        window.gapi.client.calendar.events
        .list({
            calendarId: "primary",
            showDeleted: true,
            singleEvents: true,
        })
        .then(function (response) {
            let events = response.result.items;
            if(events.length > 0){
                setEvents(formatEvents(events));
            }
        });
    };
    const formatEvents = (list) => {
        return list.map((item) => ({
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
        }));
    };
    return(
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            events={events}
        />
    )
}

export default Calendar;