import React from 'react';
import {VideoData} from "../../data/types";
import styles from "./video-item.module.css";

export type VideoProps = {
    video: VideoData;
}

const VideoItem = ({video}: VideoProps) => {
    return (
        <li className={styles.video}>
            <img className={styles.thumbnail} src={video.thumbnail}/>

            <div className={styles.snippet}>
                <h3 className={styles.title}>{video.title}</h3>
                <p className={styles.channel}>{video.channelTitle}</p>
                <p className={styles.channel}>{video.kind}</p>
                {/*<p className={styles.description}>{video.description}</p>*/}
            </div>
        </li>
    );
};

export default VideoItem;