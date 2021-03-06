import {QueryType, VideoData} from "../data/types";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";


class YoutubeService {
    private apiKey: string = '';
    private TAG: string = '[YOUTUBE_SERVICE]';

    private baseUrl: string = 'https://youtube.googleapis.com/youtube/v3';
    private querySize: string = '10';

    private client: AxiosInstance;

    constructor(apiKey: string) {
        this.client = axios.create(
            {
                baseURL: this.baseUrl,
                params: {
                    key: apiKey,
                    part: 'snippet',
                    maxResults: this.querySize
                },
            }
        );
    }

    public query = async (type: QueryType, keyword?: string): Promise<VideoData[]> => {
        let videoDatas: VideoData[] = [];

        let axiosConfig: AxiosRequestConfig = {};

        let url;

        if ('popular' === type) {
            url = '/videos';

            axiosConfig = {
                ...axiosConfig,
                params: {
                    chart: 'mostPopular',
                }
            };

        } else if ('keyword' === type) {
            if (!keyword) {
                console.log(`${this.TAG}keyword '${keyword}' is not valid.`);
                return Promise.reject(`${this.TAG}keyword '${keyword}' is not valid.`);
            }

            url = '/search';

            axiosConfig = {
                ...axiosConfig,
                params: {
                    q: 'mostPopular', keyword
                }
            };

        } else {
            return Promise.resolve(videoDatas);

        }

        console.log(`${this.TAG}query called. type : ${type}, url : ${url} ,keyword : ${keyword}`);

        await this.client.get(url, axiosConfig)
            .then(response => {
                console.log(`${this.TAG}axios status : ${response.status} result : `);
                console.dir(response);

                const items = response.data.items;

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

                console.log(`${this.TAG}axios success : ${type}, data : `);
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

export default YoutubeService;