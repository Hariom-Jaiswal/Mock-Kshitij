'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function submitContact(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const honeypot = formData.get('website') as string;

    // Honeypot Spam Protection
    if (honeypot) {
        // Silently fail for bots (return success to trick them)
        return { success: true, message: 'Message sent successfully!' };
    }

    if (!name || !phone || !email || !message) {
        return { success: false, message: 'Please fill in all fields.' };
    }

    try {
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID as string, serviceAccountAuth);

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        const now = new Date();
        await sheet.addRow({
            Date: now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
            Time: now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            Name: name,
            Phone: phone,
            Email: email,
            Message: message,
            Status: 'Waiting',
        });

        return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
        console.error('Google Sheets Error:', error);
        return { success: false, message: 'Failed to send message. Please try again.' };
    }
}
