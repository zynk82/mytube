import React from 'react';
import {VideoData} from "../../data/types";
import VideoPlayer from "../video-player/video-player";
import styles from './video-detail.module.css';

type VideoContainerProps = {
    video: VideoData
}

const VideoDetail = ({video}: VideoContainerProps) => {
    return (
        <div className={styles.container}>
            <VideoPlayer video={video}/>
            <div className={styles.information}>
                <h2 className={styles.title}>{video.title}</h2>
                <h3 className={styles.channel}>{video.channelTitle}</h3>
                <pre className={styles.description}>{video.description}</pre>
            </div>
        </div>
    );
};

export default VideoDetail;