"use client";

interface VideoPlayerProps {
  video: string;
  token: string;
}

export default function VideoPlayer({ video, token }: VideoPlayerProps) {
  return (
    <iframe
      src={`${
        process.env.NEXT_PUBLIC_API_URL
      }/api/video?video=${video}&token=${encodeURIComponent(token)}`}
      allowFullScreen
      className="w-full h-[60vw] max-h-[500px] md:h-[500px]"
    />
  );
}
