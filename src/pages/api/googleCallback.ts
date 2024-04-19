import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { getOAuth2Client } from "@/lib/googleAuth";
import { createEvent } from "@/lib/googleCalendar";

const calendar = google.calendar('v3');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const oauth2Client = getOAuth2Client();
            const code = req.query.code;
            const { tokens } = await oauth2Client.getToken(code as string);
            oauth2Client.setCredentials(tokens);
            const accessToken = tokens.access_token;
            const refreshToken = tokens.refresh_token;

            if (accessToken && refreshToken) {
                res.redirect(`/kegiatan/add?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`);
            }
        } catch (error) {
            console.error('Error authorizing with Google: ', error);
            res.status(500).json({ message: 'Error authorizing with Google' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}