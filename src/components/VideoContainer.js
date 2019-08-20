import React, { useEffect, useRef } from 'react'
import './style.css'

const VideoContainer = ({ stream }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (stream && videoRef && videoRef.current && !videoRef.current.srcObject) {
      const mediaStream = new MediaStream()
      mediaStream.addTrack(...stream.getVideoTracks())
      videoRef.current.srcObject = mediaStream
    }
  })

  // if (!stream) {
  //   return <div className="video-container" />
  // }

  return <video autoPlay className="video-container" ref={videoRef} />
}

export default VideoContainer
