"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      alert("Please select files and specify an upload path.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    formData.append("courseId", courseId);

    try {
      const { data: response } = await api.post("/course/upload_files", formData);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Files uploaded successfully!");
      } else {
        alert("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading files.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Upload Files</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="uploadPath" className="block text-sm font-medium text-gray-700">
            Upload Path:
          </Label>
          <Input
            type="text"
            id="uploadPath"
            value={courseId}
            onChange={handleCourseIdChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="fileSelect" className="block text-sm font-medium text-gray-700">
            Select Files:
          </Label>
          <Input
            type="file"
            id="fileSelect"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        <Button
          type="submit"
          className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Upload
        </Button>
      </form>
    </div>
  );
}
