import { IComment } from "@/types/blog.types";
import { Label } from "./label";
import React from "react";
import { Heart, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import useSocialStore from "@/store/useSocialStore";
import useBlogStore from "@/store/useBlogStore";
import useAuthStore from "@/store/useAuthStore";
import { toast } from "sonner";

interface CommentCardProps {
  comment: IComment;
  blogSlug: string;
}

const CommentCard = ({ comment, blogSlug }: CommentCardProps) => {
  const { deleteComment } = useSocialStore();
  const { fetchBlog } = useBlogStore();
  const { getUserId } = useAuthStore();
  const handleDeleteComment = async (commentId: string) => {
    const result = await deleteComment(commentId);
    if (result) {
      const userId = getUserId();
      if (!userId) return toast.info("Something went wrong");

      fetchBlog(blogSlug, userId);
    }
  };
  return (
    <div className="w-full border-b-2 flex flex-col gap-5 border-gray-200 h-auto p-4">
      {/* Header */}
      <div className="h-auto w-full flex items-center justify-between">
        {/* Left side */}
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="h-7 w-7 rounded-full bg-yellow-200 flex items-center justify-center">
            <Label className="font-bold">{comment.userId.username[0]}</Label>
          </div>
          {/* Username */}
          <Label>{comment.userId.username}</Label>
        </div>

        {/* Right Side */}
        <div className="">
          <Label>
            {new Date(comment.createdAt).toLocaleDateString("en-IN", {
              dateStyle: "medium",
            })}
          </Label>
        </div>
      </div>

      {/* Main */}
      <div className="w-full">
        <Label className="text-lg">{comment.content}</Label>
      </div>

      {/* Footer actions */}
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2 items-center">
          <Heart size={20} />
          <span className="text-xl">{comment.likes.length}</span>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
