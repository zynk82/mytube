import React, {useCallback, useEffect, useState} from 'react';
import './app.css';
import VideoList from "./components/video-list/video-list";
import {VideoListData} from "./data/types";
import Header from "./components/header/header";
import {query} from "./service/youtube-service";

function App() {
    const [videoList, setVideoList] = useState<VideoListData>({items: []});

    const queryPopular = () => {
        query("popular").then((videoDatas) => {
            setVideoList({items: videoDatas});
        }).catch((reason) => {
            alert(reason);
        });
    };

    const queryKeyword = (word: string) => {
        query("keyword", word).then((videoDatas) => {
            setVideoList({items: videoDatas});
        }).catch((reason) => {
            alert(reason);
        });
    };

    useEffect(queryPopular, []);

    const onSearch = useCallback((word: string) => {
            let inputWord = word.trim();

            queryKeyword(inputWord);
        }
        , []);

    const onHomeClick = useCallback(() => {
        queryPopular();
    }, []);

    return (
        <>
            <Header onSearch={onSearch} onHomeClick={onHomeClick}/>
            <VideoList videoList={videoList}/>
        </>
    );
}

export default App;
