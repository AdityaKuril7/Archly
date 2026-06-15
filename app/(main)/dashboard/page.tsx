import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipse, Ellipsis, MenuIcon, PenBox, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const InfoCard = ({
  value,
  description,
}: {
  value: string;
  description: string;
}) => (
  <Card className="h-50 w-70 flex items-center justify-center">
    <Label className="text-2xl">{description}</Label>
    <Label className="text-3xl">{value}</Label>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="justify-self-center w-240 flex flex-col items-center ">
      <div className="w-full h-auto grid grid-cols-3 place-items-center gap-8 p-4">
        <InfoCard value="5" description="Total blgos" />
        <InfoCard value="12" description="Total Likes" />
        <InfoCard value="5" description="Followers" />
      </div>
      <div className="flex w-full"></div>
    </div>
  );
};

export default Dashboard;
