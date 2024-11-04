import { fetchPosts } from '@/api';
// import { useQuery } from 'react-query'

import Posts from '@/components/Posts';
import { Progress } from '@chakra-ui/react';
import { useFindPosts } from '@/services/post';

function PostsPage() {
  // const { data, error, isError, isLoading } = useQuery('posts', fetchPosts)

  const { data, error, isError, isLoading } = useFindPosts();

  if (isLoading) {
    return <Progress size={'xs'} isIndeterminate />
  }
  if (isError) {
    return <div>Error! {(error as Error).message}</div>
  }

  return (
    <>
      {isLoading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {!error && data && <Posts posts={data} />}
    </>
  );
}

export default PostsPage;