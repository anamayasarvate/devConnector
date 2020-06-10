import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/posts';

const PostForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ text: '' });
  return (
    <>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addPost(formData));
            setFormData({ text: '' });
          }}
          className='form my-1'
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={formData.text}
            onChange={(e) => setFormData({ text: e.target.value })}
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </>
  );
};

export default PostForm;
