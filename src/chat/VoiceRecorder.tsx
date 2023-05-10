import React, { useState, useEffect } from "react";
import MicIcon from "../assets/Mic_duotone.svg";
import "./record.css";
import { SpeechClient } from "@google-cloud/speech";
const mic = require("mic");

interface Props {
  onTranscription: (transcription: string | null) => void;
}

const VoiceRecorderButton: React.FC<Props> = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false);
  const [client, setClient] = useState<SpeechClient | null>(null);
  const [micInstance, setMicInstance] = useState<any>(null);

  useEffect(() => {
    setClient(new SpeechClient());
    setMicInstance(
      mic({
        rate: "16000",
        channels: "1",
        debug: false,
        exitOnSilence: 6,
      })
    );
  }, []);
  const [recognizeStream, setRecognizeStream] = useState<any>(null);

  const startRecording = async () => {
    if (!client || !micInstance) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("stream:", stream);

      setRecording(true);

      const config = {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
        speechContexts: [
          {
            phrases: ["example phrase 1", "example phrase 2"],
          },
        ],
      };

      const request = {
        config,
        interimResults: false,
      };

      const recognizeStream = client
        .streamingRecognize()
        .on("error", console.error)
        .on("data", (data: any) => {
          console.log(
            `Transcription: ${data.results[0].alternatives[0].transcript}`
          );
          onTranscription(data.results[0].alternatives[0].transcript);
        });
      setRecognizeStream(recognizeStream);

      const audioStream = new MediaStream();
      const audioTrack = stream.getAudioTracks()[0];
      audioStream.addTrack(audioTrack);

      const recording = micInstance.getAudioStream();
      recording.pipe(recognizeStream);
      micInstance.start();
    } catch (error) {
      console.error("Error getting user media:", error);
    }
  };
  const stopRecording = () => {
    if (!micInstance || !client || !recognizeStream) return;
    setRecording(false);
    micInstance.stop();
    recognizeStream.end();
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
