import {QueryType, VideoData} from "../data/types";

type MyRequest = {
    method: string;
    redirect?: RequestRedirect;
    // mode: RequestMode;
    // cache: RequestCache;
    // credentials: RequestCredentials;
    // destination: RequestDestination;
    // headers: Headers;
    // integrity: string;
    // keepalive: boolean;
    // referrer: string;
    // referrerPolicy: ReferrerPolicy;
    // signal: AbortSignal;
    // url: string;
}

class YoutubeServiceFetch {
    private apiKey: string = '';
    private TAG: string = '[YOUTUBE_SERVICE]';

    private baseUrl: string = 'https://youtube.googleapis.com/youtube/v3';
    private querySize: string = '10';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    getPopularUrl = (): string => {
        return `${this.baseUrl}/videos?part=snippet&chart=mostPopular&maxResults=${this.querySize}&key=${this.apiKey}`;
    }

    getKeywordUrl = (keyword: string): string => {
        return `${this.baseUrl}/search?part=snippet&maxResults=${this.querySize}&q=${keyword}&key=${this.apiKey}`;
    }

    public query = async (type: QueryType, keyword?: string): Promise<VideoData[]> => {
        const requestOptions: MyRequest = {
            method: 'GET',
            redirect: 'follow',
        };

        let videoDatas: VideoData[] = [];

        let url;

        if ('popular' === type) {
            url = this.getPopularUrl();

        } else if ('keyword' === type) {
            if (!keyword) {
                console.log(`${this.TAG}keyword '${keyword}' is not valid.`);
                return Promise.reject(`${this.TAG}keyword '${keyword}' is not valid.`);
            }

            url = this.getKeywordUrl(keyword);

        } else {
            return Promise.resolve(videoDatas);

        }

        console.log(`${this.TAG}query called. type : ${type}, url : ${url} ,keyword : ${keyword}`);

        await fetch(url, requestOptions)
            .then(response => {
                return response.json();

            })
            .then(result => {
                const items = result.items;

                for (const item of items) {
                    const snippet = item.snippet;

                    let id = '';
                    let kind = '';

                    if ('keyword' === type) {
                        kind = item.id.kind;
                    }

                    if ((typeof item.id) === 'string') {
                        id = item.id;

                    } else {
                        if (kind === 'youtube#playlist') {
                            id = item.id.playlistId;

                        } else if (kind === 'youtube#channel') {
                            id = item.id.channelId;

                        } else {
                            id = item.id.videoId;

                        }

                    }

                    if (kind) {
                        kind = kind.replaceAll('youtube#', '');
                    }

                    if (id === undefined) {
                        console.log(`${this.TAG}id is undefined.`);
                        console.dir(item.id);
                    }

                    videoDatas.push({
                        videoId: id,
                        title: snippet.title,
                        channelTitle: snippet.channelTitle,
                        description: snippet.description,
                        thumbnail: snippet.thumbnails.medium.url,
                        thumbnailSmall: snippet.thumbnails.default.url,
                        kind: kind,
                    });
                }

                console.log(`${this.TAG}success : ${type}, data : `);
                console.dir(videoDatas);

                return Promise.resolve(videoDatas);

            })
            .catch(error => {
                console.error('${this.TAG}error', error)

                return Promise.reject(error);

            });

        return Promise.resolve(videoDatas);
    }
}

export default YoutubeServiceFetch;