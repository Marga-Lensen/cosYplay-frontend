import React, { useEffect, useState } from 'react';
import './Blossoms.css';

function Blossoms() {
  const [blossoms, setBlossoms] = useState([]);

  const blossomImages = [
    '/img-cosYchat/sakura2.png',
    '/img-cosYchat/sakura3.png',
    '/img-cosYchat/sakura4.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();

      setBlossoms((prev) => {
        if (prev.length >= 10) return prev; // 🌸 Begrenzung auf 10 Blüten

        return [
          ...prev,
          {
            id,
            left: Math.random() * 100,
            top: -10,
            type: Math.floor(Math.random() * blossomImages.length),
          },
        ];
      });
    }, 3000); // Weniger häufig neue Blüten (alle 3 Sekunden)

    return () => clearInterval(interval);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(`blossom-${id}`);
    if (el) {
      el.classList.add('burst');
      setTimeout(() => {
        setBlossoms((prev) => prev.filter((b) => b.id !== id));
      }, 400);
    }
  };

  return (
    <div id="blossom-container">
      {blossoms.map((blossom) => (
        <div
          key={blossom.id}
          id={`blossom-${blossom.id}`}
          className="blosse"
          style={{
            left: `${blossom.left}%`,
            top: `${blossom.top}px`,
            backgroundImage: `url(${blossomImages[blossom.type]})`,
          }}
          onClick={() => handleClick(blossom.id)}
        />
      ))}
    </div>
  );
}

export default Blossoms;
