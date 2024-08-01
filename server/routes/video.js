import { likevideoController } from "../controllers/like.js";
import { viewsController } from "../controllers/views.js";
import express from "express"
import upload from "../Helper/fileHelper.js";
import auth from "../middleware/auth.js";
import { uploadvideo } from "../controllers/video.js";
import { getallVideo } from "../controllers/video.js";
import { historycontroller, getallhistorycontroller, deletehistory } from "../controllers/history.js";
import { watchlatercontroller,getallwatchlatervontroller, deletewatchlater } from "../controllers/watchlater.js";
import { likedvideocontroller,getalllikedvideo,deletelikedvideo } from "../controllers/likedvideo.js";
const routes= express.Router();

routes.post ('/uploadvideo' , auth, upload.single("file"), uploadvideo)
routes.get('/getvideos',getallVideo )
routes.patch('/like/:id', likevideoController)
routes.patch('/views/:id', viewsController)

routes.post('/history',auth,historycontroller)
routes.get('/getallhistory',getallhistorycontroller)
routes.delete('/deletehistory/:userid',auth,deletehistory)

routes.post('/watchlater',auth,watchlatercontroller)
routes.get('/getallwatchlater',getallwatchlatervontroller)
routes.delete('/deletewatchlater/:videoid/:viewer',auth,deletewatchlater)

routes.post('/likevideo',auth,likedvideocontroller)
routes.get('/getalllikevide',getalllikedvideo)
routes.delete('/deletelikevideo/:videoid/:viewer',auth,deletelikedvideo)

export default routes