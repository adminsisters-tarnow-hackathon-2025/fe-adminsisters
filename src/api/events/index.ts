import { axiosRequest } from "@/hooks/useAxios";
import { Post } from "./types";

export async function getPostsAsync() {
  return await axiosRequest<Post[]>({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    defaultErrorMessage: "Failed to fetch posts",
  });
}
