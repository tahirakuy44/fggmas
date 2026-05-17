import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { emailAddress } = await request.json();

    if (!emailAddress) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const {
      CPANEL_HOSTNAME,
      CPANEL_USERNAME,
      CPANEL_API_TOKEN,
    } = process.env;

    if (!CPANEL_HOSTNAME || !CPANEL_USERNAME || !CPANEL_API_TOKEN) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const domainParts = emailAddress.split('@');
    if (domainParts.length !== 2) {
      return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
    }
    const emailPrefix = domainParts[0];
    const domain = domainParts[1];

    const baseUrl = CPANEL_HOSTNAME.replace(/\/$/, '');
    
    // Construct cPanel UAPI URL for deletion
    const url = new URL(`${baseUrl}/execute/Email/delete_pop`);
    url.searchParams.append('email', emailPrefix);
    url.searchParams.append('domain', domain);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `cpanel ${CPANEL_USERNAME}:${CPANEL_API_TOKEN}`
      }
    });

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return NextResponse.json({ error: data.errors[0] }, { status: 400 });
    }

    if (data.status === 1) {
      return NextResponse.json({ 
        message: 'Email account deleted successfully'
      });
    }

    return NextResponse.json({ error: 'Failed to delete email account for unknown reason' }, { status: 500 });

  } catch (error: any) {
    console.error('Error deleting email:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
