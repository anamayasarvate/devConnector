import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Spinner from '../../components/layout/Spinner';
import PostItem from './PostItem';
import ProfileForm from './PostForm';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ProfileForm />
          {posts.length > 0 ? (
            <div className='posts'>
              {posts.map((post) => {
                return <PostItem key={post._id} post={post} />;
              })}
            </div>
          ) : (
            <h4>No Posts to display</h4>
          )}
        </>
      )}
    </>
  );
};

export default Posts;
