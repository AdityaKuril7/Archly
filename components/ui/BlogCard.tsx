import {
  Hand,
  MessageCircle,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  BadgeCheck,
} from "lucide-react";

export default function BlogCard() {
  return (
    <div className="border-b pb-8 mb-8">
      <div className="flex gap-6">
        {/* Content */}
        <div className="flex-1">
          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="font-medium">Anand Gaur</span>

            <BadgeCheck size={16} className="text-blue-500 fill-blue-500" />

            <span>May 31</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold leading-tight mb-4">
            AI for iOS Developers: The Complete Roadmap
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-xl leading-relaxed line-clamp-2">
            How to use AI to build iOS apps faster, and how to build AI
            features into your apps. Explained step by step.
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-5 text-gray-500">
              <div className="flex items-center gap-1">
                <Hand size={18} />
                <span>59</span>
              </div>

              <div className="flex items-center gap-1">
                <MessageCircle size={18} />
                <span>2</span>
              </div>

              <div className="flex items-center gap-1">
                <Repeat2 size={18} />
                <span>1</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <Bookmark size={20} />
              <MoreHorizontal size={20} />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="w-60 h-40 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
            alt="blog"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}