import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // Erfolg / Fehler-Meldung

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Einfache Validierung
    if (!name || !email || !message) {
      setStatus('Bitte fülle alle Felder aus.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        setStatus('Nachricht erfolgreich gesendet!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Fehler beim Senden. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Fehler:', error);
      setStatus('Serverfehler. Bitte später erneut versuchen.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Kontakt</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </label>

        <label>
          E-Mail:
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </label>

        <label>
          Nachricht:
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required 
          />
        </label>

        <button type="submit">Absenden</button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
