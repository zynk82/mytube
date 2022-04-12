export type VideoData = {
    title: string,
    description: string,
    channelTitle:string,
    videoId:string,
    thumbnail:string,
    kind:string,
}

export type VideoListData = {
    items:VideoData[];
}
