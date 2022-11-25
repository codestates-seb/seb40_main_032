import React, { useEffect } from 'react';
import PostDetailMain from '../component/postDetail/PostDetailMain';

function PostDetailPage() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <PostDetailMain />;
}

export default PostDetailPage;
