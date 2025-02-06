"use client";

export default function UploadPage() {
  return (
    <div className="container">
      <h1>Upload Video</h1>
      <form action="http://192.168.131.171:8000/api/upload" method="POST">
        <input
          type="file"
          name="video"
          accept="video/mp4,video/quicktime"
          required
        />
        <button type="submit">Upload and Convert</button>
      </form>
    </div>
  );
}
