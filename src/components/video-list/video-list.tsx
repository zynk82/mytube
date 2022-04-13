import React from 'react';
import {Status, VideoData, VideoListData} from "../../data/types";
import VideoItem from "../video-item/video-item";
import styles from './video-list.module.css';

export type VideoListProps = {
    status: Status;
    videoList: VideoListData;
    onVideoSelected: (video: VideoData) => void;
}

const VideoList = (props: VideoListProps) => {
    console.log(`list rendered. ${props.videoList.items.length}`);

    return (
        <ul className={styles.videos}>
            {
                props.videoList.items.map((videoData: VideoData) => {
                    return (
                        <VideoItem key={videoData.videoId} video={videoData} onVideoSelected={props.onVideoSelected}
                                   status={props.status}/>
                    );
                })
            }
        </ul>
    );
}

export default React.memo(VideoList, (p, n) => {
    return p.videoList === n.videoList && p.status === n.status;
});