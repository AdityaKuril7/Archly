"use client";

import { useState } from "react";
import Editor from "@/components/ui/Editor";
import { Button } from "@/components/ui/button";

const CreatePostPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleCoverImage = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.click();

    input.onchange = () => {
      const file = input.files?.[0];

      if (file) {
        setImage(file);
      }
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold">Create Post</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Write and publish your story
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline">
              Save Draft
            </Button>

            <Button>
              Publish
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {/* Cover Image */}
          <div
            onClick={handleCoverImage}
            className="group flex h-64 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-muted/20 transition-all hover:bg-muted/40"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Cover Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-semibold">
                  Upload Cover Image
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Click here to select an image
                </p>
              </div>
            )}
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-none bg-transparent text-5xl font-extrabold tracking-tight outline-none placeholder:text-muted-foreground"
          />

          {/* Excerpt */}
          <input
            type="text"
            placeholder="Write a short summary of your article..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border-none bg-transparent text-xl text-muted-foreground outline-none placeholder:text-muted-foreground"
          />

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <input
              type="text"
              placeholder="Technology"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-72 rounded-lg border bg-background px-4 outline-none focus:ring-2"
            />
          </div>

          {/* Editor */}
            <Editor
              value={content}
              onChange={setContent}
            />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;