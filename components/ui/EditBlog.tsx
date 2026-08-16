"use client";

import useBlogStore from "@/store/useBlogStore";
import React, { useEffect, useState, useCallback } from "react";
import Editor from "@/components/ui/Editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Toaster } from "./sonner";

type FormData = {
  title: string;
  excerpt: string;
  category: string;
  content: string;
};

const emptyForm: FormData = {
  title: "",
  excerpt: "",
  category: "",
  content: "",
};

export default function EditBlog({ slug }: { slug: string }) {
  const { fetchBlog, blog, updateBlog } = useBlogStore();

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchBlog(slug).finally(() => setIsLoading(false));
  }, [slug, fetchBlog]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        category: blog.category || "",
        content: blog.content || "",
      });
    }
  }, [blog]);

  const baseline: FormData = {
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    category: blog?.category || "",
    content: blog?.content || "",
  };
  const isFormDirty = JSON.stringify(formData) !== JSON.stringify(baseline);

  const handleUpdate = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const success = await updateBlog(slug, formData);
      if (success) {
        toast.success("Blog updated successfully");
      } else {
        toast.error("Failed to update blog");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, slug, updateBlog]);

  const handleDiscard = () => {
    setFormData(baseline);
    toast("Changes discarded");
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-sm">Loading blog...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Toaster />
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Edit Blog</h1>
            <p className="text-sm text-gray-500">
              {isFormDirty ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDiscard}
              disabled={!isFormDirty || isSubmitting}
            >
              Discard
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={!isFormDirty || isSubmitting}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          {/* Basic info card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Basic Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange("title")}
                    placeholder="Enter blog title"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={handleInputChange("category")}
                    placeholder="Enter category"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange("excerpt")}
                  placeholder="A short summary shown on the blog list"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[500px]">
                <Editor
                  value={formData.content}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, content }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom action bar (mobile-friendly, mirrors header) */}
        <div className="mt-6 flex justify-end gap-3 sm:hidden">
          <Button
            variant="outline"
            onClick={handleDiscard}
            disabled={!isFormDirty || isSubmitting}
            className="flex-1"
          >
            Discard
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!isFormDirty || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
