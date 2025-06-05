import { getPostsAsync } from "@/api/temp";
import { Post } from "@/api/temp/types";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchPostsAsync() {
    const response = await getPostsAsync();
    setPosts(response?.data ?? []);
  }

  useEffect(() => {
    (async () => {
      await fetchPostsAsync();
    })();
  }, []);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Welcome to Admin Sisters
          </CardTitle>
          <CardDescription>
            This is the home page of your admin dashboard template.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="text-base">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{post.body}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
