export type VideoData = {
    title: string,
    description: string,
    channelTitle: string,
    videoId: string,
    thumbnail: string,
    thumbnailSmall: string,
    kind: string,
}

export type VideoListData = {
    items: VideoData[];
}

export type Status = 'list' | 'detail';

export type QueryType = 'popular' | 'keyword';