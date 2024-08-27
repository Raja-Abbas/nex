import React from 'react';
  
  const ChatUtils = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default ChatUtils;
  export const getTimeCategory = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));
  
    if (diffDays < 1) return "Today";
    if (diffDays < 7) return "Last Week";
    if (diffDays < 30) return "Past 30 Days";
    return "Older";
  };
  
  export const highlightURLs = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          className="text-dark-blue underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };
  
  export const removeDuplicateMessages = (messages) => {
    const seenTexts = new Set();
    return messages.filter((message) => {
      if (seenTexts.has(message.text)) {
        return false;
      } else {
        seenTexts.add(message.text);
        return true;
      }
    });
  };
  

export const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };
  