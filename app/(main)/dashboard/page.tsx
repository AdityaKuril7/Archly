"use client"
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {useDashboardStore} from "@/store/useDashboardStore";
import useAuthStore from "@/store/useAuthStore";
import {useEffect} from "react";
import TableRow from "@/components/ui/TableRow";

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
  const {getUserId} = useAuthStore()
  const {blogs,fetchDashboardBlogs} = useDashboardStore()

  useEffect(()=>{
    const userId = getUserId()
    if(!userId) return console.log("Missing userId")
    fetchDashboardBlogs(userId)
  },[])


  return (
    <div className="justify-self-center w-240 flex flex-col items-center ">
      <div className="w-full h-auto grid grid-cols-3 place-items-center gap-8 p-4">
        <InfoCard value="5" description="Total blgos" />
        <InfoCard value="12" description="Total Likes" />
        <InfoCard value="5" description="Followers" />
      </div>
      <div className="flex w-full mt-10 justify-center">
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium">
                  Likes
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium">
                  Views
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium w-20">
                  Action
                </th>
              </tr>
              </thead>

              <tbody>
                {blogs?.map((blog)=>(
                  <TableRow key={blog._id} title={blog.title} status={blog.status} likes={blog.likes.length} views={0} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
