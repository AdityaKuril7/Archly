import EditBlog from "@/components/ui/EditBlog";
import useBlogStore from "@/store/useBlogStore";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="w-screen h-screen overflow-scroll">
      <EditBlog slug={slug} />
    </div>
  );
}
