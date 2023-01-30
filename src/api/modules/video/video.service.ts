import { CreateVideoInput, Video } from './video.schema';
import { videos } from '../../db';
import { addDays } from '../../utils/add-days';

export async function findVideos(): Promise<Video[]> {
  return videos;
}

export async function createVideo(video: CreateVideoInput): Promise<Video> {
  const createdAt = new Date().toISOString();
  const newVideo = {
    id: videos.length,
    canBeDownloaded: false,
    minAgeRestriction: null,
    ...video,
    createdAt,
    publicationDate: video?.publicationDate || addDays(createdAt, 1).toISOString(),
  };
  videos.push(newVideo);
  return newVideo;
}

export async function findVideoById(id: string): Promise<Video | undefined> {
  return videos.find((video) => video.id === Number(id));
}

export async function updateVideoById(id: string, newVideo: CreateVideoInput): Promise<Video | undefined> {
  let videoToUpdate = videos.find((video) => video.id === Number(id));
  if (videoToUpdate) {
    videoToUpdate = {
      ...videoToUpdate,
      ...newVideo,
    };

  }
  console.log(videoToUpdate);
  // @ts-ignore
  videos = videos.map((video) => video.id === Number(id) ? videoToUpdate : video);
  return videoToUpdate;
}

export async function deleteVideoById(id: string): Promise<Video | undefined> {
  const videoIndex = videos.findIndex((video) => video.id === Number(id));
  if (videoIndex !== -1) {
    return videos.splice(videoIndex, 1)[0];
  }
  return undefined;
}