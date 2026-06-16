import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Ellipsis} from "lucide-react";

interface TableRowProps {
  title: string;
  status: string;
  likes: number;
  views: number;
}

export default function TableRow({title, status, likes, views}: TableRowProps) {
  return(
    <tr className="border-t hover:bg-muted/30 transition-colors">
      <td className="px-6 py-4">
        <p className="max-w-lg truncate text-sm text-muted-foreground">
          {title}
        </p>
      </td>

      <td className={`px-6 py-4 ${status == "published" ? "text-green-600" : "text-red-600"} text-right font-medium`}>
        {status.toUpperCase()}
      </td>

      <td className="px-6 py-4 text-right font-medium">
        {likes}
      </td>

      <td className="px-6 py-4 text-right font-medium">
        {views}
      </td>

      <td className="px-6 py-4 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Change Visibility
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}