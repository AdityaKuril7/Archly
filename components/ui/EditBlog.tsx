"use client";

import useBlogStore from "@/store/useBlogStore";
import React, { useEffect, useState } from "react";
import Editor from "@/components/ui/Editor";
import { Label } from "./label";
import { Toaster } from "./sonner";
import { Button } from "./button";
import { toast } from "sonner";

export default function EditBlog({ slug }: { slug: string }) {
  const { fetchBlog, blog, updateBlog } = useBlogStore();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const success = await updateBlog(slug, formData);
    if (success) {
      toast.info("Blog updated successfully");
      setLoading(false);
    } else {
      toast.error("Failed to update blog");
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    fetchBlog(slug);
  }, [slug]);

  useEffect(() => {
    if (!blog) return;

    setFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      category: blog.category || "",
      content: blog.content || "",
    });
  }, [blog]);

  const handleDiscard = () => {
    if (!blog) return;

    setFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      category: blog.category || "",
      content: blog.content || "",
    });
  };

  return (
    <div className="flex flex-col gap-5 w-190 h-full pt-5">
      <Toaster />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-200">
        {/* Title */}
        <div>
          <label className="mb-2 block">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Title"
            className="w-full rounded-md border p-3"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            placeholder="Category"
            className="w-full rounded-md border p-3"
          />
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className="mb-2 block">Excerpt</label>
          <input
            type="text"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                excerpt: e.target.value,
              }))
            }
            placeholder="Excerpt"
            className="w-full rounded-md border p-3"
          />
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <label className="mb-2 block">Content</label>
          <Editor
            value={formData.content}
            onChange={(content) =>
              setFormData((prev) => ({
                ...prev,
                content,
              }))
            }
          />
        </div>
        {/* Buttons */}
        <div className="flex gap-3 md:col-span-2">
          <Button
            onClick={handleUpdate}
            className={`rounded-md px-5 py-2 text-white ${loading && "bg-gray-400 cursor-not-allowed"}`}
          >
            {loading ? "Updating..." : "Update"}
          </Button>

          <Button
            onClick={handleDiscard}
            variant={"destructive"}
            className={`rounded-md border px-5 py-2 ${loading && "bg-gray-400 cursor-not-allowed"}`}
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
}
