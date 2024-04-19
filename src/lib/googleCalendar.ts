import { google } from "googleapis";

const calendar = google.calendar("v3");
export const createEvent = async (
  accessToken: any,
  refreshToken: any,
  event: any
) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      requestBody: {
        ...event,
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating event:", error);
    throw error;
  }
};
