import { useState, useRef, useEffect } from "react";
import "./VideocallFeature.css";

function VideocallFeature({ closeCall }) {
  const ws = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isRecord, setIsRecord] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const records = useRef([]);
  const callButtonRef = useRef(null);

  useEffect(() => {
    function connectWebSocket() {
      ws.current = new WebSocket("ws://localhost:7030");

      ws.current.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.current.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        if (data.offer) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          ws.current.send(JSON.stringify({ answer }));
        } else if (data.answer) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        } else if (data.candidate) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      };

      ws.current.onclose = (event) => {
        console.log("WebSocket connection closed:", event.reason);
        // Try to reconnect after a delay
        setTimeout(connectWebSocket, 1000);
      };

      ws.current.onerror = (error) => {
        console.log("WebSocket error:", error);
      };
    }

    connectWebSocket();

    return () => {
      ws.current.close();
    };
  }, [peerConnection]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);

    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    ws.current.send(JSON.stringify({ offer }));
  };

  const screenShare = async () => {
    if (!peerConnection) {
      return;
    }

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track.kind === "video") {
          sender.replaceTrack(screenTrack);
        }
      });
    } catch (error) {
      console.log("Error sharing screen", error);
    }
  };

  const recording = async () => {
    if (!peerConnection) {
      return;
    }

    records.current = [];
    const stream = new MediaStream(peerConnection.getSenders().map((sender) => sender.track));
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        records.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(records.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recorded_video.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    recorder.start();
    setIsRecord(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecord(false);
    }
  };

 const endCall =()=>
 {
    if(peerConnection)
    {
        peerConnection.close();
        setPeerConnection(null)
    }

    if(localStream)
    {
        localStream.getTracks().forEach(track => track.stop())
        setLocalStream(null)
    }

    if(remoteStream)
    {
        remoteStream.getTracks().forEach(track=>track.stop())
        setRemoteStream(null)
    }

    if(ws.current)
    {
        ws.current.close()
    }

    if(isRecord)
    {
        stopRecording();
    }

    closeCall();

 }

  return (
    <div className="video-call">
      <video id="localvideo" ref={(video) => video && (video.srcObject = localStream)} autoPlay  />
      <video id="remotevideo" ref={(video) => video && (video.srcObject = remoteStream)} autoPlay />
      <div className="btn_container">
        <button id="callButton" ref={callButtonRef} onClick={startCall}>Start Call</button>
        <button id="callButton" onClick={screenShare}>Share Screen</button>
        <button id="callButton" onClick={isRecord ? stopRecording : recording}>
          {isRecord ? "Stop Recording" : "Start Recording"}
        </button>

        <button id="callButton"  onClick={endCall}>End Call</button>
      </div>
      <div className="x_btn" onClick={closeCall}>X</div>
    </div>
  );
}

export default VideocallFeature;
