import { google } from "googleapis";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { getOAuth2Client } from '@/lib/googleAuth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const oauth2Client = getOAuth2Client();
            const url = oauth2Client.generateAuthUrl({
                access_type: "offline",
                scope: ["https://www.googleapis.com/auth/calendar"],
                redirect_uri: "http://localhost:3000/api/googleCallback",
            });

            res.status(200).json({ url });
        } catch (error) {
            console.error('Error generating auth URL:', error);
            res.status(500).json({ error: 'Failed to generate auth URL' });
        }
        
    } else {
        res.status(405).send('Method not allowed');
    }
}


