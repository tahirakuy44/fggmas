import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cpanelHost = process.env.CPANEL_HOSTNAME;
    const cpanelUser = process.env.CPANEL_USERNAME;
    const cpanelToken = process.env.CPANEL_API_TOKEN;

    if (!cpanelHost || !cpanelUser || !cpanelToken) {
      throw new Error('Missing cPanel configuration in environment variables');
    }

    // 1. Fetch all email accounts
    const listUrl = `${cpanelHost}/execute/Email/list_pops`;
    const listRes = await fetch(listUrl, {
      method: 'GET',
      headers: {
        'Authorization': `cpanel ${cpanelUser}:${cpanelToken}`,
      },
    });

    const listData = await listRes.json();
    if (listData.errors) {
      throw new Error(listData.errors[0] || 'Failed to list emails');
    }

    const emailAccounts = listData.data || [];
    const now = Date.now();
    const timeLimitInMs = 5 * 60 * 1000;
    
    let deletedCount = 0;

    // 2. Loop through and check for expired timestamp
    for (const account of emailAccounts) {
      // account.email usually looks like "admin_1716123456@reaps.my.id"
      // account.user is usually "admin_1716123456"
      const username = account.login || account.email || account.user;
      
      // Extract timestamp using regex looking for _[13-digit number] before the @ or end of string
      const match = username.match(/_(\d{13})(?:@|$)/);
      if (match) {
        const timestamp = parseInt(match[1], 10);
        
        // If the email is older than 5 minutes, delete it
        if (now - timestamp > timeLimitInMs) {
          const parts = username.split('@');
          const emailPrefix = parts[0];
          // Determine the domain from the account itself or fallback to process.env
          const domain = parts.length > 1 ? parts[1] : (process.env.DOMAIN_NAME || 'reaps.my.id');
          
          const deleteUrl = `${cpanelHost}/execute/Email/delete_pop?email=${encodeURIComponent(emailPrefix)}&domain=${encodeURIComponent(domain)}`;
          await fetch(deleteUrl, {
            method: 'GET',
            headers: {
              'Authorization': `cpanel ${cpanelUser}:${cpanelToken}`,
            },
          });
          
          deletedCount++;
        }
      }
    }

    return NextResponse.json({ success: true, deletedCount });
  } catch (error: any) {
    console.error('Cleanup Error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during cleanup' }, { status: 500 });
  }
}
