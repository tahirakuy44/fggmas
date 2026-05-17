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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}><i className="fa-brands fa-optin-monster"></i></div>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#1e293b' }}>LuminagenPro</h1>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a 
            href="https://ais-pre-2qhdmsbs7fyvvwuto2ee2y-63035386885.asia-east1.run.app" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#ef4444', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(239, 68, 68, 0.3)' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', marginRight: '6px' }}>
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            Download YouTube
          </a>
          <a 
            href="https://ais-pre-fl4ck7s22gpwguilccyvgq-63035386885.asia-east1.run.app" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(139, 92, 246, 0.3)' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className="fa-solid fa-scissors" style={{ marginRight: '6px' }}></i> Video Cutter
          </a>
          <a 
            href="https://weave.figma.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#0f172a', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.3)' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className="fa-solid fa-clapperboard" style={{ marginRight: '6px' }}></i> Kling Motion
          </a>
          <a 
            href="https://fal.ai/explore" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#f97316', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(249, 115, 22, 0.3)' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className="fa-solid fa-cube" style={{ marginRight: '6px' }}></i> Model
          </a>
        </div>
      </header>

      {/* MAIN BODY */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* SIDEBAR */}
        <aside style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Menu Utama</div>
          
          <button 
            onClick={() => setActiveTab('create')}
            style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', background: activeTab === 'create' ? '#eff6ff' : 'transparent', color: activeTab === 'create' ? '#2563eb' : '#475569', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'create' ? 600 : 500, fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <span style={{ marginRight: '10px', fontSize: '1.2rem' }}><i className="fa-solid fa-envelope"></i></span> Create New Email
          </button>
          
          <button 
            onClick={() => setActiveTab('inbox')}
            style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', background: activeTab === 'inbox' ? '#eff6ff' : 'transparent', color: activeTab === 'inbox' ? '#2563eb' : '#475569', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'inbox' ? 600 : 500, fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <span style={{ marginRight: '10px', fontSize: '1.2rem' }}><i className="fa-solid fa-inbox"></i></span> Check Inbox
          </button>
        </aside>

        {/* CONTENT AREA */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#ffffff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #f1f5f9' }}>
            {activeTab === 'create' ? (
              <CreateEmailForm onSuccess={handleEmailCreated} />
            ) : (
              <InboxViewer credentials={activeTab === 'inbox' ? autoLoginCredentials : null} />
            )}
          </div>
        </main>
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
      
      setTimeout(() => {
        onSuccess(data.email, password);
        setPrefix('');
        setPassword('');
      }, 1000); 
      
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.5rem', color: '#1e293b' }}>Create Email Account</h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>Generate a new cPanel email address instantly.</p>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Email Prefix</label>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <input 
            type="text" 
            value={prefix} 
            onChange={(e) => setPrefix(e.target.value)} 
            placeholder="e.g. admin"
            required
            style={{ flex: 1, padding: '0.75rem 1rem', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', border: '1px solid #cbd5e1', borderRight: 'none', fontSize: '1rem', outline: 'none' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', color: '#64748b', fontWeight: 500 }}>
            @luminagenpro.my.id
          </div>
        </div>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Password</label>
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter a strong password"
          required
          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={status.loading}
        style={{ padding: '0.875rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: status.loading ? 'wait' : 'pointer', marginTop: '0.5rem', transition: 'background 0.2s', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
        onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'}
        onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
      >
        {status.loading ? 'Creating...' : 'Create Email Account'}
      </button>

      {status.error && <div style={{ color: '#b91c1c', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '0.95rem' }}>{status.error}</div>}
      {status.success && <div style={{ color: '#15803d', padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '0.95rem' }}>{status.success}</div>}
    </form>
  );
}

function InboxViewer({ credentials }: { credentials: {email: string, password: string} | null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [emails, setEmails] = useState<any[]>([]);

  useEffect(() => {
    if (credentials) {
      setEmail(credentials.email);
      setPassword(credentials.password);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.5rem', color: '#1e293b' }}>Check Inbox</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Read and manage emails for your generated accounts.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => fetchInbox(email, password)}
            disabled={status.loading || !email || !password}
            style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.9rem', cursor: (status.loading || !email || !password) ? 'not-allowed' : 'pointer', transition: 'background 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            onMouseOver={(e) => !status.loading && email && password && (e.currentTarget.style.background = '#0284c7')}
            onMouseOut={(e) => e.currentTarget.style.background = '#0ea5e9'}
          >
            <span style={{ marginRight: '6px' }}><i className="fa-solid fa-rotate-right"></i></span> Refresh
          </button>
          <button 
            type="button"
            onClick={handleDeleteAccount}
            disabled={status.loading || !email}
            style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.9rem', cursor: (status.loading || !email) ? 'not-allowed' : 'pointer', transition: 'background 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            onMouseOver={(e) => !status.loading && email && (e.currentTarget.style.background = '#dc2626')}
            onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}
          >
            <span style={{ marginRight: '6px' }}><i className="fa-solid fa-trash"></i></span> Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleFetch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="admin@luminagenpro.my.id"
          required
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', minWidth: '200px', outline: 'none' }}
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          required
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', minWidth: '200px', outline: 'none' }}
        />
        <button 
          type="submit" 
          disabled={status.loading}
          style={{ padding: '0.75rem 1.5rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: status.loading ? 'wait' : 'pointer', transition: 'background 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#0f172a'}
          onMouseOut={(e) => e.currentTarget.style.background = '#1e293b'}
        >
          {status.loading ? 'Loading...' : 'Login'}
        </button>
      </form>

      {status.error && <div style={{ color: '#b91c1c', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{status.error}</div>}
      {status.success && <div style={{ color: '#15803d', padding: '0.75rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{status.success}</div>}

      {emails.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {emails.map((msg: any) => (
            <div key={msg.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#475569' }}>
                    {msg.from.charAt(0).toUpperCase()}
                  </div>
                  <strong style={{ color: '#334155', fontSize: '0.95rem' }}>{msg.from}</strong>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{new Date(msg.date).toLocaleString()}</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#0f172a' }}>{msg.subject}</h3>
                {msg.html ? (
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                    <iframe 
                      srcDoc={msg.html} 
                      style={{ width: '100%', height: '500px', border: 'none', display: 'block' }} 
                      title="Email Content"
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                    />
                  </div>
                ) : (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto' }}>
                      {msg.text && msg.text.trim() ? msg.text : 'No text content'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !status.loading && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#94a3b8' }}><i className="fa-solid fa-envelope-open-text"></i></div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#334155' }}>Inbox is Empty</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>Waiting for new emails to arrive...</p>
          </div>
        )
      )}
    </div>
  );
}
