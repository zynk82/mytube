import React from 'react';
import {VideoData, VideoListData} from "../../data/types";
import VideoItem from "../video-item/video-item";
import styles from './video-list.module.css';

export type VideoListProps = {
    videoList: VideoListData;
}

const VideoList = (props: VideoListProps) => {
    return (
        <ul className={styles.videos}>
            {
                props.videoList.items.map((videoData: VideoData) => {
                    return (
                        <VideoItem key={videoData.videoId} video={videoData}/>
                    );
                })
            }
        </ul>
    );
}

export default VideoList;