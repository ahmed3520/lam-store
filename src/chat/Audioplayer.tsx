import React, { useEffect, useRef } from "react";

interface WaveformVisualizerProps {
  src: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const context = new AudioContext();
    const srcNode = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();
    srcNode.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    audio.addEventListener("play", () => {
      context.resume().then(() => {
        renderFrame();
      });
    });
  }, []);

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={src} type="audio/mpeg" />
      </audio>
      <canvas ref={canvasRef} width="300" height="150" />
    </div>
  );
};

export default WaveformVisualizer;
