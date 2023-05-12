import React, { useState } from "react";
import MicIcon from "../assets/Mic_duotone.svg";
import "./record.css";

interface Props {
  onTranscription: (transcription: string | null) => void;
}

const VoiceRecorderButton: React.FC<Props> = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [chunks, setChunks] = useState<BlobPart[] | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("stream:", stream);

      setRecording(true);

      // Create a new MediaRecorder instance
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      setMediaRecorder(mediaRecorder);

      // Create an array to store the recorded audio data
      const chunks: BlobPart[] = [];
      setChunks(chunks);

      // Listen for the dataavailable event
      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      // Start recording
      mediaRecorder.start();
    } catch (error) {
      console.error("Error getting user media:", error);
    }
  };

  const sendFileToServer = (file: File) => {
    const formData = new FormData();
    formData.append("file", file, "file.webm");

    fetch("https://socket-test.ataha352.repl.co/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle server response
        console.log("response=>", response);
      })
      .catch((error) => {
        // Handle error
      });
  };

  const stopRecording = () => {
    if (!mediaRecorder || !chunks) return;
    setRecording(false);

    // Stop recording
    mediaRecorder.stop();

    // Convert recorded audio data to a WAV file
    const blob = new Blob(chunks, { type: "audio/webm" });
    const file = new File([blob], "file.webm");

    // Send WAV file to server
    sendFileToServer(file);
  };

  return (
    <button
      className={`voice-record ${recording ? "animate" : ""}`}
      onClick={() => {
        if (recording) {
          stopRecording();
        } else {
          startRecording();
        }
      }}
    >
      {!recording && <img src={MicIcon} alt="Mic icon" />}
      {recording && (
        <>
          <div className="wave">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="wave">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="wave">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </>
      )}
    </button>
  );
};

export default VoiceRecorderButton;
