import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';

function Inbox() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const messages = [
    { id: 1, sender: 'Alice', content: 'Hello!', time: '2h' },
    { id: 2, sender: 'Bob', content: 'How are you?', time: '5h' },
    { id: 3, sender: 'Charlie', content: 'See you soon!', time: '1d' },
  ];

  return (
    <div className="p-4 transition-all duration-500 ease-in-out">
      {isDesktop ? (
        <div className="flex">
          <div className="w-1/3">
            <MessageList messages={messages} onSelect={handleSelectMessage} />
          </div>
          <div className="w-2/3">
            {selectedMessage ? (
              <MessageDetail message={selectedMessage} />
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        selectedMessage ? (
          <MessageDetail message={selectedMessage} onBack={() => setSelectedMessage(null)} />
        ) : (
          <MessageList messages={messages} onSelect={handleSelectMessage} />
        )
      )}
    </div>
  );
}

export default Inbox;
