import React, { useEffect } from 'react';
import Footer from '../component/common/footer/Footer';
import PostDetailMain from '../component/postDetail/PostDetailMain';

function PostDetailPage() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <PostDetailMain />
      <Footer />
    </>
  );
}

export default PostDetailPage;
