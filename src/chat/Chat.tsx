import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import ChatMessages from "./ChatMessage";
import "./chat.css";
import { ReactComponent as SendIcon } from "../assets/send.svg";
import MicIcon from "../assets/Mic_duotone.svg";
import UploadIcon from "../assets/upload.svg";
import VoiceRecorderButton from "./VoiceRecorder";
function ChatInterface() {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>("");
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: string; timestamp: string }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleVideoClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowModal(false);
  };

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) return;
    const newMessage = {
      text: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
    messageInputRef.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = () => {
    const file = fileInputRef.current?.files?.[0];
    // handle file upload logic
  };
  const [lastTranscription, setLastTranscription] = useState("");

  useEffect(() => {
    if (transcription && transcription !== lastTranscription) {
      setInputValue(
        (prevInputValue) =>
          prevInputValue + transcription.slice(lastTranscription.length)
      );
      setLastTranscription(transcription);
    }
  }, [transcription, lastTranscription]);

  console.log("transcription", transcription);
  return (
    <div className="chat-interface">
      <div className="cont">
        <ChatMessages messages={messages} />
        <div className="spac-msg"></div>
        <div className="chat-footer">
          <form
            className="message-input-container"
            onSubmit={handleSendMessage}
          >
            <div className="message-wr">
              <div className="text-wr">
                <textarea
                  className="message-input"
                  placeholder="Type your message here"
                  value={inputValue}
                  onChange={handleInputChange}
                  ref={messageInputRef}
                />
              </div>
              <VoiceRecorderButton onTranscription={setTranscription} />
            </div>

            <button className="send-button" type="submit">
              <SendIcon />
            </button>

            <button className="upload-button" onClick={handleUploadClick}>
              <img src={UploadIcon} alt="Upload Icon" />
            </button>
            <button className="video-button" onClick={handleVideoClick}>
              <i className="fas fa-video"></i>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="file-input"
              onChange={handleFileSelect}
            />
          </form>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Choose an option</h2>
              <button
                className="modal-option"
                onClick={() => handleOptionSelect("live")}
              >
                <i className="fas fa-video"></i> Live Camera
              </button>
              <button
                className="modal-option"
                onClick={() => handleOptionSelect("upload")}
              >
                <i className="fas fa-upload"></i> Upload Video
              </button>
              <button className="modal-option" onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {selectedOption === "live" && (
          <div className="live-video-container">
            <Webcam ref={webcamRef} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatInterface;
