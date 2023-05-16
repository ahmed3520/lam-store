import React from "react";
import "./message.css";
import AudioPlayer from "./Audioplayer";
interface Message {
  text: string;
  sender: string;
  timestamp: string;
  audio?: Blob | MediaSource; // optional audio URL
}

interface ChatMessagesProps {
  messages: Message[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.sender}`}>
          {message.audio ? (
            <div className="message-audio">
              <AudioPlayer src={URL.createObjectURL(message.audio)} />
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ) : (
            <>
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
