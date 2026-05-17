import { NextResponse } from 'next/server';
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';

export async function POST(request: Request) {
  try {
    const { emailAddress, password } = await request.json();

    if (!emailAddress || !password) {
      return NextResponse.json({ error: 'Email address and password are required' }, { status: 400 });
    }

    // Extract domain from email address
    const domainParts = emailAddress.split('@');
    if (domainParts.length !== 2) {
      return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
    }
    const domain = domainParts[1];

    const config = {
      imap: {
        user: emailAddress,
        password: password,
        host: `mail.${domain}`,
        port: 993,
        tls: true,
        authTimeout: 10000,
        tlsOptions: { rejectUnauthorized: false } // Needed for some cPanel self-signed certs
      }
    };

    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    // Fetch emails from the last 30 days
    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
      markSeen: false,
      struct: true
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    
    // Sort by date, newest first, and limit to last 20
    messages.sort((a, b) => b.attributes.date.getTime() - a.attributes.date.getTime());
    const recentMessages = messages.slice(0, 20);

    const parsedEmails = await Promise.all(recentMessages.map(async (message) => {
      const all = message.parts.find(part => part.which === '');
      const id = message.attributes.uid;
      const idHeader = "Imap-Id: "+id+"\r\n";
      
      try {
        const parsed = await simpleParser(idHeader + all.body);
        return {
          id,
          subject: parsed.subject,
          from: parsed.from?.value[0]?.address || 'Unknown',
          date: parsed.date,
          text: parsed.text,
          html: parsed.html
        };
      } catch (err) {
        return {
          id,
          subject: 'Error parsing email',
          from: 'Unknown',
          date: message.attributes.date,
          text: 'Could not parse email content.',
          html: ''
        };
      }
    }));

    connection.end();

    return NextResponse.json({ emails: parsedEmails });

  } catch (error: any) {
    console.error('IMAP Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to connect to inbox. Check credentials.' }, { status: 500 });
  }
}
