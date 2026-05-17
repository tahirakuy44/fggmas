import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { emailPrefix, password, quota = 1024 } = await request.json();

    if (!emailPrefix || !password) {
      return NextResponse.json({ error: 'Email prefix and password are required' }, { status: 400 });
    }

    const {
      CPANEL_HOSTNAME,
      CPANEL_USERNAME,
      CPANEL_API_TOKEN,
      DOMAIN_NAME,
    } = process.env;

    if (!CPANEL_HOSTNAME || !CPANEL_USERNAME || !CPANEL_API_TOKEN || !DOMAIN_NAME) {
      return NextResponse.json({ error: 'Server configuration error (missing environment variables)' }, { status: 500 });
    }

    // Ensure hostname doesn't have trailing slash
    const baseUrl = CPANEL_HOSTNAME.replace(/\/$/, '');
    
    // Construct cPanel UAPI URL
    const url = new URL(`${baseUrl}/execute/Email/add_pop`);
    url.searchParams.append('email', emailPrefix);
    url.searchParams.append('password', password);
    url.searchParams.append('domain', DOMAIN_NAME);
    url.searchParams.append('quota', quota.toString());

    // Call cPanel API
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
        message: 'Email account created successfully',
        email: `${emailPrefix}@${DOMAIN_NAME}`
      });
    }

    return NextResponse.json({ error: 'Failed to create email account for unknown reason' }, { status: 500 });

  } catch (error: any) {
    console.error('Error creating email:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
