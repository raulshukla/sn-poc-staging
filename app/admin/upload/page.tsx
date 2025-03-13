"use client"

import { api } from "@/lib/api";
import React, { useState } from "react";

export default function Upload() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [courseId, setCourseId] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleCourseIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFiles || !courseId) {
      alert('Please select files and specify an upload path.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    formData.append('courseId', courseId);

    try {
      const {data: response} = await api.post(
        '/course/upload_files',
        formData
      )

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('Files uploaded successfully!');
      } else {
        alert('Failed to upload files.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading files.');
    }
  };

  return (
    <div>
      <h1>Upload Files</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Path:</label>
          <input type="text" value={courseId} onChange={handleCourseIdChange} required />
        </div>
        <div>
          <label>Select Files:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
