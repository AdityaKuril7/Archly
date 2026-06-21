import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { IBlogSchema } from "@/types/blog.types";
import { useRouter } from "next/navigation";

interface TableRowProps {
  blog: IBlogSchema;
  onClickChangeVisibility: () => void;
  onClickDelete: () => void;
}

export default function TableRow({
  blog,
  onClickChangeVisibility,
  onClickDelete,
}: TableRowProps) {
  const { toggleVisiblity } = useDashboardStore();
  const router = useRouter();

  return (
    <tr className="border-t hover:bg-muted/30 transition-colors ">
      <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => router.push(`/blog/${blog.slug}`)}
      >
        <p className="max-w-lg truncate text-sm text-muted-foreground cursor-pointer">
          {blog.title}
        </p>
      </td>

      <td
        className={`px-6 py-4 ${blog.status == "published" ? "text-green-600" : "text-red-600"} text-right font-medium`}
      >
        {blog.status.toUpperCase()}
      </td>

      <td className="px-6 py-4 text-right font-medium">{blog?.likes.length}</td>

      <td className="px-6 py-4 text-right font-medium">{blog?.viewedBy.length}</td>

      <td className="px-6 py-4 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onClickChangeVisibility}>
              {blog.status === "published"
                ? "Draft This Blog"
                : "Published This Blog"}
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive" onClick={onClickDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
