import React, { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

const VimeoPlayer = ({ videoUrl }) => {
  const playerRef = useRef(null); // Reference to Vimeo player div

  useEffect(() => {
    if (videoUrl && playerRef.current) {
      // Extract Vimeo video ID from the URL
      const videoId = videoUrl.split('/').slice(-2, -1)[0];

      const options = {
        id: videoId,
        width: 640,
        loop: false,
      };

      const player = new Player(playerRef.current, options);

      player.setVolume(0.5);

      return () => player.destroy(); // Clean up the player instance on component unmount
    }
  }, [videoUrl]);

  return <div ref={playerRef} />; // This div will contain the Vimeo player
};

export default VimeoPlayer;
