import { fetchPosts } from "@/api";
import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

export function useFindPosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      return (await fetchPosts());
    },
  });
}
