import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment, deleteComment } from '../../actions/posts';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ text: '' });

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment(postId, formData));
          setFormData({ text: '' });
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
          value={formData.text}
          onChange={(e) => setFormData({ text: e.target.value })}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
