const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const router = express.Router();

/*
 @route POST /api/posts
 @desc Create a post
 @access private
*/
router.post(
  '/',
  [auth, [check('text', 'Post content is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = new Post({
        user: user.id,
        text: text,
        name: user.name,
        avatar: user.avatar,
      });
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

/*
 @route GET /api/posts
 @desc get all posts
 @access private
*/
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/*
 @route GET /api/posts/:id
 @desc get one post by id
 @access private
*/
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

/*
 @route DELETE /api/posts/:id
 @desc Delete a post
 @access private
*/
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

/*
 @route PUT /api/posts/like/:id
 @desc Add like
 @access private
*/
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json({ msg: 'Post already liked' });
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

/*
 @route PUT /api/posts/unlike/:id
 @desc unlike
 @access private
*/
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    )
      return res.status(400).json({ msg: 'Post has not been liked yet' });

    const likeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(likeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

/*
 @route POST /api/posts/comment/:id
 @desc Add a comment to a post
 @access private
*/

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      if (!post) return res.status(404).json({ msg: 'Post not found' });

      const comment = {
        user: user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(comment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.log(error.message);
      if (error.kind === 'ObjectId')
        return res.status(404).json({ msg: 'Post not found' });
      res.status(500).send('Server error');
    }
  }
);

/*
 @route DELETE /api/posts/comment/:id/:comment_id
 @desc Delete a comment
 @access private
*/
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'No post found' });

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not Authorized' });

    const commentIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);
    post.comments.splice(commentIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'No post and/or comment found' });
    res.status(500).send('Server error');
  }
});

module.exports = router;
