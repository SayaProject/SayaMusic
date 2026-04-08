const API_KEY = "AIzaSyAaeiXwds0MLGgUKdYrHhGi1KJnzwWrIic";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

export async function searchYouTube(query: string, pageToken?: string): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string }> {
  const params = new URLSearchParams({
    part: "snippet",
    q: query + " music",
    type: "video",
    videoCategoryId: "10",
    maxResults: "20",
    key: API_KEY,
  });
  if (pageToken) params.set("pageToken", pageToken);

  const res = await fetch(`${BASE_URL}/search?${params}`);
  const data = await res.json();

  const videos: YouTubeVideo[] = (data.items || []).map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
  }));

  return { videos, nextPageToken: data.nextPageToken };
}

export async function getTrendingMusic(pageToken?: string): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string }> {
  const params = new URLSearchParams({
    part: "snippet",
    chart: "mostPopular",
    videoCategoryId: "10",
    regionCode: "US",
    maxResults: "20",
    key: API_KEY,
  });
  if (pageToken) params.set("pageToken", pageToken);

  const res = await fetch(`${BASE_URL}/videos?${params}`);
  const data = await res.json();

  const videos: YouTubeVideo[] = (data.items || []).map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
  }));

  return { videos, nextPageToken: data.nextPageToken };
}
