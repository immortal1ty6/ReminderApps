import { google } from "googleapis";
import { createEvent } from "@/lib/googleCalendar";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { accessToken, refreshToken, event } = req.body;
    if (req.method === "POST") {
        try {
            const responseEvent = await createEvent(accessToken, refreshToken, event);
            console.log('Event created:', responseEvent);
            res.status(200).json(responseEvent);
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ error: 'Failed to create event' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ message: 'Method not allowed' });
    }
}