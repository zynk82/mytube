import React from 'react';
import {VideoData} from "../../data/types";
import styles from './video-player.module.css';

type VideoPlayerProps = {
    video: VideoData
}

const VideoPlayer = ({video}: VideoPlayerProps) => {
    const src: string = `https://www.youtube.com/embed/${video.videoId}`;

    return (
        <iframe
            className={styles.video}
            width="100%"
            height="550px"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen/>
    );
};

export default VideoPlayer;