import React, { useEffect } from 'react';
import PostItem from '../posts/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, post } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPost(match.params.postId));
  }, []);
  return (
    <>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <Link to='/posts' className='btn'>
            Back To Posts
          </Link>
          <PostItem showActions={false} post={post} />
          <CommentForm postId={post._id} />
          <div className='comments'>
            {post.comments.length > 0 &&
              post.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Post;
