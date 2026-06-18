"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'inbox'>('create');
  const [autoLoginCredentials, setAutoLoginCredentials] = useState<{email: string, password: string, createdAt: number} | null>(null);

  // Trigger auto-cleanup on app load
  useEffect(() => {
    fetch('/api/email/cleanup', { method: 'POST' }).catch(console.error);
  }, []);

  const handleEmailCreated = (email: string, pass: string, createdAt: number) => {
    setAutoLoginCredentials({ email, password: pass, createdAt });
    setActiveTab('inbox');
  };

  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}><i className="fa-brands fa-optin-monster"></i></div>
          <h1 className={styles.logoText}>Reaps</h1>
        </div>
        
        <div className={styles.navLinks}>
          <a 
            href="https://ais-pre-whsbnqzopemevsph7dt7g4-63035386885.asia-east1.run.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.navIcon}>
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            Download YouTube
          </a>
          <a 
            href="https://ais-pre-fl4ck7s22gpwguilccyvgq-63035386885.asia-east1.run.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <i className={`fa-solid fa-scissors ${styles.actionButtonIcon}`}></i> Video Cutter
          </a>
          <a 
            href="https://weave.figma.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <i className={`fa-solid fa-clapperboard ${styles.actionButtonIcon}`}></i> Kling Motion
          </a>
          <a 
            href="https://fal.ai/explore" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <i className={`fa-solid fa-cube ${styles.actionButtonIcon}`}></i> Model
          </a>
        </div>
      </header>

      {/* MAIN BODY */}
      <div className={styles.mainBody}>
        
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Menu Utama</div>
          
          <button 
            onClick={() => setActiveTab('create')}
            className={`${styles.sidebarButton} ${activeTab === 'create' ? styles.sidebarButtonActive : styles.sidebarButtonInactive}`}
          >
            <span className={styles.sidebarIcon}><i className="fa-solid fa-envelope"></i></span> Create New Email
          </button>
          
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`${styles.sidebarButton} ${activeTab === 'inbox' ? styles.sidebarButtonActive : styles.sidebarButtonInactive}`}
          >
            <span className={styles.sidebarIcon}><i className="fa-solid fa-inbox"></i></span> Check Inbox
          </button>
        </aside>

        {/* CONTENT AREA */}
        <main className={styles.contentArea}>
          <div className={styles.contentCard}>
            {activeTab === 'create' ? (
              <CreateEmailForm onSuccess={handleEmailCreated} />
            ) : (
              <InboxViewer 
                credentials={activeTab === 'inbox' ? autoLoginCredentials : null} 
                onClearCredentials={() => setAutoLoginCredentials(null)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function CreateEmailForm({ onSuccess }: { onSuccess: (email: string, pass: string, createdAt: number) => void }) {
  const [prefix, setPrefix] = useState('');
  const [domain, setDomain] = useState('reaps.my.id');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  useEffect(() => {
    setPrefix(Math.random().toString(36).substring(2, 10));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const createdAt = Date.now();
      const finalPrefix = `${prefix}_${createdAt}`;
      
      // Auto-generate strong 16-char password
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      let generatedPassword = "";
      for (let i = 0; i < 16; i++) {
        generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      const res = await fetch('/api/email/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailPrefix: finalPrefix, password: generatedPassword, domain })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create email');

      setStatus({ loading: false, error: '', success: `Success! Created ${data.email}` });
      
      setTimeout(() => {
        onSuccess(data.email, generatedPassword, createdAt);
        setPrefix('');
      }, 1000); 
      
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <form onSubmit={handleCreate} className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create Email Account</h2>
        <p className={styles.formSubtitle}>Generate a temporary cPanel email. Password will be securely auto-generated and hidden.</p>
      </div>
      
      <div>
        <div className={styles.labelRow}>
          <label className={styles.inputLabelNoMargin}>Email Prefix</label>
          <button 
            type="button"
            className={styles.generateButtonSmall}
            onClick={() => setPrefix(Math.random().toString(36).substring(2, 10))}
          >
            <i className="fa-solid fa-dice"></i> Generate Random
          </button>
        </div>
        <div className={styles.inputGroup}>
          <input 
            type="text" 
            value={prefix} 
            onChange={(e) => setPrefix(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} 
            placeholder="e.g. admin"
            required
            className={styles.inputField}
          />
          <select 
            className={`${styles.inputDomain} ${styles.domainSelect}`} 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)}
            title="Select Domain"
            aria-label="Select Domain"
          >
            <option value="reaps.my.id">@reaps.my.id</option>
            <option value="kangleonardo.site">@kangleonardo.site</option>
          </select>
        </div>
        <p className={styles.inputNote}>* A timestamp will be automatically appended to the prefix for auto-deletion purposes.</p>
      </div>
      
      <button 
        type="submit" 
        disabled={status.loading || !prefix}
        className={styles.submitButton}
      >
        {status.loading ? 'Creating Secure Account...' : 'Generate Auto-Destruct Email'}
      </button>

      {status.error && <div className={styles.errorBox}>{status.error}</div>}
      {status.success && <div className={styles.successBox}>{status.success}</div>}
    </form>
  );
}

function InboxViewer({ credentials, onClearCredentials }: { credentials: {email: string, password: string, createdAt: number} | null, onClearCredentials: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [emails, setEmails] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const previousEmailCount = React.useRef(0);

  useEffect(() => {
    if (credentials) {
      previousEmailCount.current = 0;
      setEmail(credentials.email);
      setPassword(credentials.password);
      fetchInbox(credentials.email, credentials.password);

      // Countdown Timer Logic
      const updateTimer = () => {
        const elapsed = Date.now() - credentials.createdAt;
        const remaining = Math.max(0, (5 * 60 * 1000) - elapsed);
        setTimeLeft(Math.floor(remaining / 1000));
        
        if (remaining <= 0) {
           handleDeleteAccount(credentials.email, true);
        }
      };
      
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      
      // Auto-refresh inbox every 10 seconds (silent mode)
      const refreshInterval = setInterval(() => {
        fetchInbox(credentials.email, credentials.password, true);
      }, 10000);

      return () => {
        clearInterval(interval);
        clearInterval(refreshInterval);
      };
    }
  }, [credentials]);

  const fetchInbox = async (fetchEmail: string, fetchPass: string, isSilent: boolean = false) => {
    if (!fetchEmail || !fetchPass) return;
    
    if (!isSilent) setStatus({ loading: true, error: '', success: '' });
    
    try {
      const res = await fetch('/api/email/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: fetchEmail, password: fetchPass })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch inbox');

      const fetchedEmails = data.emails || [];
      if (fetchedEmails.length > previousEmailCount.current) {
        playSound('new-email');
      }
      previousEmailCount.current = fetchedEmails.length;

      setEmails(fetchedEmails);
      if (!isSilent) {
        setStatus({ loading: false, error: '', success: 'Inbox refreshed!' });
        setTimeout(() => setStatus(s => ({ ...s, success: '' })), 3000);
      }
    } catch (err: any) {
      if (!isSilent) setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  const handleDeleteAccount = async (targetEmail: string = email, autoExpired: boolean = false) => {
    if (!targetEmail) return;
    
    if (!autoExpired && !window.confirm(`Are you sure you want to PERMANENTLY delete the account ${targetEmail}? This cannot be undone.`)) {
      return;
    }

    setStatus({ loading: true, error: '', success: '' });
    
    try {
      const res = await fetch('/api/email/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: targetEmail })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to delete account');

      playSound('delete');
      setStatus({ loading: false, error: '', success: '' });
      setEmails([]);
      setEmail('');
      setPassword('');
      setTimeLeft(null);
      onClearCredentials();
      
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!email) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}><i className="fa-solid fa-inbox"></i></div>
        <h3 className={styles.emptyStateTitle}>No Active Session</h3>
        <p className={styles.emptyStateText}>Please create a new email to check its inbox.</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.inboxHeader}>
        <div>
          <h2 className={styles.inboxTitle}>Secure Inbox</h2>
          <div className={styles.emailAddressRow}>
            <p className={styles.emailAddressText}>{email}</p>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(email);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              title="Copy email address"
              className={`${styles.copyButton} ${copied ? styles.copyButtonSuccess : ''}`}
            >
              {copied ? (
                <><i className="fa-solid fa-check"></i> Copied!</>
              ) : (
                <><i className="fa-regular fa-copy"></i> Copy</>
              )}
            </button>
          </div>
        </div>
        
        {timeLeft !== null && (
          <div className={`${styles.timerBox} ${timeLeft < 60 ? styles.timerWarning : styles.timerNormal}`}>
            <i className={`fa-regular fa-clock ${styles.timerIcon}`}></i>
            Time Remaining: {formatTime(timeLeft)}
          </div>
        )}

        <div className={styles.actionButtons}>
          <button 
            onClick={() => fetchInbox(email, password)}
            disabled={status.loading || !email || !password}
            className={styles.actionButton}
          >
            <span className={styles.actionButtonIcon}><i className="fa-solid fa-rotate-right"></i></span> Refresh
          </button>
          <button 
            type="button"
            onClick={() => handleDeleteAccount(email, false)}
            disabled={status.loading || !email}
            className={styles.actionButton}
          >
            <span className={styles.actionButtonIcon}><i className="fa-solid fa-trash"></i></span> Delete
          </button>
        </div>
      </div>

      {status.error && <div className={`${styles.errorBox} ${styles.messageBoxMargin}`}>{status.error}</div>}
      {status.success && <div className={`${styles.successBox} ${styles.messageBoxMargin}`}>{status.success}</div>}

      {emails.length > 0 ? (
        <div className={styles.emailList}>
          {emails.map((msg: any) => (
            <div key={msg.id} className={styles.emailItem}>
              <div className={styles.emailItemHeader}>
                <div className={styles.emailSenderRow}>
                  <div className={styles.emailSenderAvatar}>
                    {msg.from.charAt(0).toUpperCase()}
                  </div>
                  <strong className={styles.emailSenderName}>{msg.from}</strong>
                </div>
                <span className={styles.emailDate}>{new Date(msg.date).toLocaleString()}</span>
              </div>
              <div className={styles.emailBody}>
                <h3 className={styles.emailSubject}>{msg.subject}</h3>
                {msg.html ? (
                  <div className={styles.emailHtmlContainer}>
                    <iframe 
                      srcDoc={`<base target="_blank">${msg.html}`} 
                      className={styles.emailIframe}
                      title="Email Content"
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                    />
                  </div>
                ) : (
                  <div className={styles.emailTextContainer}>
                    <p className={styles.emailTextContent}>
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
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}><i className="fa-solid fa-envelope-open-text"></i></div>
            <h3 className={styles.emptyStateTitle}>Inbox is Empty</h3>
            <p className={styles.emptyStateText}>Waiting for new emails to arrive...</p>
          </div>
        )
      )}
    </div>
  );
}

const playSound = (type: 'new-email' | 'delete') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'new-email') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.1); 
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'delete') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    console.log('Audio error:', e);
  }
};
