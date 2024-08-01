import express from 'express'
import { postComment,getComment,deleteComment,editComment, getcommentVideo } from '../controllers/comment.js'
import auth from '../middleware/auth.js'
const router=express.Router();

router.post('/post', auth,postComment);
router.get('/get',getComment);
router.delete('/delete/:id', auth, deleteComment);
router.patch('/edit/:id', auth, editComment);
router.get('/:videoId', getcommentVideo)

export default router