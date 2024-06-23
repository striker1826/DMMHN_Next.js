import { useCallback, useEffect, useRef, useState } from 'react';

export const useVideoHandler = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isEnd, setIsEnd] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  const getWebcam = useCallback(async () => {
    const constraints = {
      video: true,
      audio: true,
    };

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert('카메라 정보를 가져오지 못했습니다. 권한 설정을 확인해주세요.');
    }
  }, [videoRef, setStream]);

  useEffect(() => {
    if (!stream && !isEnd) {
      getWebcam();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream, getWebcam, isEnd]);

  const handleStartRecording = () => {
    try {
      recordedChunks.current = [];
      setDownloadUrl(null);

      mediaRecorderRef.current = new MediaRecorder(stream as MediaStream, {
        mimeType: 'video/webm',
      });

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      alert('화면에 카메라가 켜질 때까지 기다려주세요.');
    }
  };
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null); // 스트림을 null로 설정하여 재사용을 방지
    }
    setIsEnd(true);
    setRecording(false);
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = 'recording.webm';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(downloadUrl);
    }
  };

  return { handleStartRecording, handleStopRecording, handleDownload, recording, downloadUrl };
};
