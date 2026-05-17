"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'inbox'>('create');
  const [autoLoginCredentials, setAutoLoginCredentials] = useState<{email: string, password: string} | null>(null);

  const handleEmailCreated = (email: string, pass: string) => {
    setAutoLoginCredentials({ email, password: pass });
    setActiveTab('inbox');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Email Accounts Manager</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <a 
          href="https://ais-pre-2qhdmsbs7fyvvwuto2ee2y-63035386885.asia-east1.run.app" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1.5rem', background: '#FF0000', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          Download YouTube
        </a>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setActiveTab('create')}
          style={{ padding: '0.75rem 1.5rem', background: activeTab === 'create' ? '#0070f3' : '#eaeaea', color: activeTab === 'create' ? 'white' : '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Create New Email
        </button>
        <button 
          onClick={() => setActiveTab('inbox')}
          style={{ padding: '0.75rem 1.5rem', background: activeTab === 'inbox' ? '#0070f3' : '#eaeaea', color: activeTab === 'inbox' ? 'white' : '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Check Inbox
        </button>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #eaeaea', color: '#333' }}>
        {activeTab === 'create' ? (
          <CreateEmailForm onSuccess={handleEmailCreated} />
        ) : (
          <InboxViewer credentials={activeTab === 'inbox' ? autoLoginCredentials : null} />
        )}
      </div>
    </div>
  );
}

function CreateEmailForm({ onSuccess }: { onSuccess: (email: string, pass: string) => void }) {
  const [prefix, setPrefix] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await fetch('/api/email/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailPrefix: prefix, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create email');

      setStatus({ loading: false, error: '', success: `Success! Created ${data.email}` });
      
      // Trigger the auto-login flow
      setTimeout(() => {
        onSuccess(data.email, password);
        setPrefix('');
        setPassword('');
      }, 1000); // Slight delay so user can see the success message
      
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Create Email Account</h2>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Prefix</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={prefix} 
            onChange={(e) => setPrefix(e.target.value)} 
            placeholder="admin"
            required
            style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <span style={{ color: '#666' }}>@luminagenpro.my.id</span>
        </div>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Strong password"
          required
          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem', boxSizing: 'border-box' }}
        />
      </div>
      <button 
        type="submit" 
        disabled={status.loading}
        style={{ padding: '1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: status.loading ? 'wait' : 'pointer', marginTop: '1rem' }}
      >
        {status.loading ? 'Creating...' : 'Create Email'}
      </button>

      {status.error && <div style={{ color: '#dc3545', padding: '1rem', background: '#f8d7da', borderRadius: '6px', marginTop: '1rem' }}>{status.error}</div>}
      {status.success && <div style={{ color: '#28a745', padding: '1rem', background: '#d4edda', borderRadius: '6px', marginTop: '1rem' }}>{status.success}</div>}
    </form>
  );
}

function InboxViewer({ credentials }: { credentials: {email: string, password: string} | null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [emails, setEmails] = useState<any[]>([]);

  // Auto-fill credentials if passed from creation tab
  useEffect(() => {
    if (credentials) {
      setEmail(credentials.email);
      setPassword(credentials.password);
      // Auto fetch after setting credentials
      fetchInbox(credentials.email, credentials.password);
    }
  }, [credentials]);

  const fetchInbox = async (fetchEmail: string, fetchPass: string) => {
    if (!fetchEmail || !fetchPass) return;
    
    setStatus({ loading: true, error: '', success: '' });
    
    try {
      const res = await fetch('/api/email/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: fetchEmail, password: fetchPass })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch inbox');

      setEmails(data.emails || []);
      setStatus({ loading: false, error: '', success: 'Inbox refreshed!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus(s => ({ ...s, success: '' })), 3000);
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  const handleDeleteAccount = async () => {
    if (!email) return;
    
    if (!window.confirm(`Are you sure you want to PERMANENTLY delete the account ${email}? This cannot be undone.`)) {
      return;
    }

    setStatus({ loading: true, error: '', success: '' });
    
    try {
      const res = await fetch('/api/email/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to delete account');

      setStatus({ loading: false, error: '', success: 'Account deleted successfully!' });
      setEmails([]);
      setEmail('');
      setPassword('');
      
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInbox(email, password);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>Check Inbox</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => fetchInbox(email, password)}
            disabled={status.loading || !email || !password}
            style={{ padding: '0.5rem 1rem', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: (status.loading || !email || !password) ? 'not-allowed' : 'pointer' }}
          >
            🔄 Refresh Inbox
          </button>
          <button 
            type="button"
            onClick={handleDeleteAccount}
            disabled={status.loading || !email}
            style={{ padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: (status.loading || !email) ? 'not-allowed' : 'pointer' }}
          >
            🗑️ Delete Account
          </button>
        </div>
      </div>

      <form onSubmit={handleFetch} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="admin@luminagenpro.my.id"
          required
          style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem', minWidth: '200px' }}
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          required
          style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem', minWidth: '200px' }}
        />
        <button 
          type="submit" 
          disabled={status.loading}
          style={{ padding: '0.75rem 1.5rem', background: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: status.loading ? 'wait' : 'pointer' }}
        >
          {status.loading ? 'Loading...' : 'Login & Fetch'}
        </button>
      </form>

      {status.error && <div style={{ color: '#dc3545', padding: '1rem', background: '#f8d7da', borderRadius: '6px', marginBottom: '1rem' }}>{status.error}</div>}
      {status.success && <div style={{ color: '#28a745', padding: '0.75rem', background: '#d4edda', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>{status.success}</div>}

      {emails.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {emails.map((msg: any) => (
            <div key={msg.id} style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '1rem', background: '#f9f9f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                <strong>From: {msg.from}</strong>
                <span>{new Date(msg.date).toLocaleString()}</span>
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{msg.subject}</h3>
              {msg.html ? (
                <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', background: '#fff', marginTop: '1rem' }}>
                  <iframe 
                    srcDoc={msg.html} 
                    style={{ width: '100%', height: '400px', border: 'none', display: 'block' }} 
                    title="Email Content"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                  />
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#444', whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto' }}>
                  {msg.text && msg.text.trim() ? msg.text : 'No text content'}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        !status.loading && <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>No emails found or inbox not checked yet.</p>
      )}
    </div>
  );
}
