import {VideoData} from "../data/types";

const TAG: string = '[YOUTUBE_SERVICE]';

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

const urlPopular: string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=AIzaSyCK_skRn0x8G_s-BK5CcAfmfXnLow9_KpI';
const urlSearch: string = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=react&key=AIzaSyCK_skRn0x8G_s-BK5CcAfmfXnLow9_KpI';

const baseUrl: string = 'https://youtube.googleapis.com/youtube/v3';
const apiKey: string = 'AIzaSyCK_skRn0x8G_s-BK5CcAfmfXnLow9_KpI';
const querySize: string = '10';

const getPopularUrl = (): string => {
    return `${baseUrl}/videos?part=snippet&chart=mostPopular&maxResults=${querySize}&key=${apiKey}`;
}

const getKeywordUrl = (keyword: string): string => {
    return `${baseUrl}/search?part=snippet&maxResults=${querySize}&q=${keyword}&key=${apiKey}`;
}

console.log(`${TAG}youtube-service loaded`);

type QueryType = 'popular' | 'keyword';

export const query = async (type: QueryType, keyword?: string): Promise<VideoData[]> => {
    const requestOptions: MyRequest = {
        method: 'GET',
        redirect: 'follow',
    };

    let videoDatas: VideoData[] = [];

    let url;

    if ('popular' === type) {
        url = getPopularUrl();

    } else if ('keyword' === type) {
        if (!keyword) {
            console.log(`${TAG}keyword '${keyword}' is not valid.`);
            return Promise.reject(`${TAG}keyword '${keyword}' is not valid.`);
        }

        url = getKeywordUrl(keyword);

    } else {
        return Promise.resolve(videoDatas);

    }

    console.log(`${TAG}query called. type : ${type}, url : ${url} ,keyword : ${keyword}`);

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

                    } else {
                        id = item.id.videoId;

                    }

                }

                if (kind) {
                    kind = kind.replaceAll('youtube#', '');
                }

                if (id === undefined) {
                    console.log(`${TAG}id is undefined.`);
                    console.dir(item.id);
                }

                videoDatas.push({
                    videoId: id,
                    title: snippet.title,
                    channelTitle: snippet.channelTitle,
                    description: snippet.description,
                    thumbnail: snippet.thumbnails.medium.url,
                    kind: kind,
                });
            }

            console.log(`${TAG}success : ${type}, data : `);
            console.dir(videoDatas);

            return Promise.resolve(videoDatas);

        })
        .catch(error => {
            console.error('${TAG}error', error)

            return Promise.reject(error);

        });

    return Promise.resolve(videoDatas);
}