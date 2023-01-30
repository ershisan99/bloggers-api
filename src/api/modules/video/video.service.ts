import { CreateVideoInput, Video } from './video.schema';
import { videos } from '../../db';

export async function findVideos(): Promise<Video[]> {
  return videos;
}

export async function createVideo(video: CreateVideoInput): Promise<Video> {
  const newVideo = {
    id: videos.length,
    publicationDate: new Date().toISOString(),
    canBeDownloaded: false,
    minAgeRestriction: null,
    ...video,
    createdAt: new Date().toISOString(),
  };
  videos.push(newVideo);
  return newVideo;
}

export async function findVideoById(id: string): Promise<Video | undefined> {
  return videos.find((video) => video.id === Number(id));
}

export async function updateVideoById(id: string, newVideo: CreateVideoInput): Promise<Video | undefined> {
  let updatedVideo = videos.find((video) => video.id === Number(id));
  if (updatedVideo) {
    updatedVideo = {
      ...newVideo,
      ...updatedVideo,
    };
  }
  return updatedVideo;
}

export async function deleteVideoById(id: string): Promise<Video | undefined> {
  const videoIndex = videos.findIndex((video) => video.id === Number(id));
  if (videoIndex !== -1) {
    return videos.splice(videoIndex, 1)[0];
  }
  return undefined;
}