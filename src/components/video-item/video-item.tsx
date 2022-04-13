import React from 'react';
import {Status, VideoData} from "../../data/types";
import styles from "./video-item.module.css";

export type VideoProps = {
    status: Status;
    video: VideoData;
    onVideoSelected: (video: VideoData) => void;
}

const VideoItem = ({video, onVideoSelected, status}: VideoProps) => {
    console.log(`item rendered.${video.title}`)

    const onVideoClick = () => {
        onVideoSelected(video);
    };

    let videoListStatusClass = '';

    let thumbnailUrl = '';
    let thumbnailStatusClass = '';

    if (status === "list") {
        videoListStatusClass = styles.side;

        thumbnailUrl = video.thumbnail;
        thumbnailStatusClass = styles.thumbnail_default;

    } else {
        videoListStatusClass = styles.main;

        thumbnailUrl = video.thumbnailSmall;
        thumbnailStatusClass = styles.thumbnail_small;

    }

    return (
        <li className={`${styles.video} ${videoListStatusClass}`} onClick={onVideoClick}>
            <img className={`${styles.thumbnail} ${thumbnailStatusClass}`} src={thumbnailUrl}/>

            <div className={styles.snippet}>
                <h3 className={styles.title}>{video.title}</h3>
                <p className={styles.channel}>{video.channelTitle}</p>
                <p className={styles.channel}>{video.kind}</p>
                {/*<p className={styles.description}>{video.description}</p>*/}
            </div>
        </li>
    );
};

export default React.memo(VideoItem, (p, n) => {
    return p.video === n.video && p.status === n.status;
});