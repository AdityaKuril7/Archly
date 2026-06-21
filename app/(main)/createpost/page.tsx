"use client";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/ui/Editor"));
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import useUiStore from "@/store/useUiStore";
import { AddBlogSchema } from "@/types/blog.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const CreatePostPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { user, fetchMe } = useAuthStore();
  const { addBlog } = useBlogStore();
  const { isSidebarOpen } = useUiStore();
  const router = useRouter();

  useEffect(() => {
    fetchMe();
  }, []);

  const uploadToCloudinary = async (): Promise<string | null> => {
    if (!imageFile) return imageUrl;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "zsp0yydw");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return data.secure_url as string;
  };

  const handleUploadBlog = async (status: "draft" | "published") => {
    if (!user) return;

    try {
      setIsUploading(true);

      const fields = {
        title,
        excerpt,
        content,
        category,
      };

      const missingField = Object.entries(fields).find(([_, value]) => !value);

      if (missingField) {
        return toast.info(`${missingField[0]} is missing`);
      }

      const uploadedImageUrl = await uploadToCloudinary();
      setImageUrl(uploadedImageUrl);

      const newBlog: AddBlogSchema = {
        category,
        content,
        excerpt,
        image: uploadedImageUrl,
        status,
        title,
      };

      const { success, message } = await addBlog(newBlog);
      toast.info(message);

      if (success) {
        setInterval(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background w-240 justify-self-center">
      <Toaster />
      <div className="mx-auto max-w-4xl px-6 pt-10 pb-30 overflow-scroll h-screen">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold">Create Post</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Write and publish your story
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={isUploading}
              onClick={() => handleUploadBlog("draft")}
            >
              {isUploading ? "Saving..." : "Save Draft"}
            </Button>

            <Button
              disabled={isUploading}
              onClick={() => handleUploadBlog("published")}
            >
              {isUploading ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </header>

        <div className="space-y-8">
          <div
            onClick={() => document.getElementById("cover-input")?.click()}
            className={`group flex h-auto ${!imagePreview && "p-10"} cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-muted/20 transition-all hover:bg-muted/40`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Cover Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-semibold">Upload Cover Image</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Click here to select an image
                </p>
              </div>
            )}
          </div>

          <input
            id="cover-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
                setImageUrl(null);
              }
            }}
          />

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
            <label className="mb-2 block text-sm font-medium">Category</label>
            <input
              type="text"
              placeholder="Technology"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-72 rounded-lg border bg-background px-4 outline-none focus:ring-2"
            />
          </div>

          {/* Editor */}
          <Editor value={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
