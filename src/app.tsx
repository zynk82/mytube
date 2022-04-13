import React, {useCallback, useEffect, useState} from 'react';
import './app.module.css';
import VideoList from "./components/video-list/video-list";
import {Status, VideoData, VideoListData} from "./data/types";
import Header from "./components/header/header";
import styles from './app.module.css';
import YoutubeService from './service/youtube-service';
import VideoDetail from "./components/video-detail/video-detail";

type AppProps = {
    youtubeService: YoutubeService;
}

function App({youtubeService}: AppProps) {
    const [videoList, setVideoList] = useState<VideoListData>({items: []});
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
    const [status, setStatus] = useState<Status>("list");

    const queryPopular = () => {
        youtubeService.query("popular").then((videoDatas) => {
            setVideoList({items: videoDatas});
        }).catch((reason) => {
            alert(reason);
        });
    };

    const queryKeyword = (word: string) => {
        youtubeService.query("keyword", word).then((videoDatas) => {
            setVideoList({items: videoDatas});
        }).catch((reason) => {
            alert(reason);
        });
    };

    useEffect(queryPopular, []);

    const onSearch = useCallback((word: string) => {
            queryKeyword(word.trim());
            setSelectedVideo(null);
            setStatus("list");
        }
        , []);

    const onHomeClick = useCallback(() => {
        queryPopular();
        setSelectedVideo(null);
        setStatus("list");
    }, []);

    const onVideoSelected = useCallback((video: VideoData) => {
        console.log(video.videoId);

        setSelectedVideo(video);

        if (status !== 'detail') {
            setStatus("detail");
        }

    }, []);

    return (
        <main className={styles.main}>
            <Header onSearch={onSearch} onHomeClick={onHomeClick}/>

            <div className={styles.contents}>
                {
                    selectedVideo &&
                    <div className={styles.detail}>
                        <VideoDetail video={selectedVideo}/>
                    </div>
                }

                <div className={styles.list}>
                    <VideoList status={status} videoList={videoList} onVideoSelected={onVideoSelected}/>
                </div>
            </div>
        </main>
    );
}

export default App;
