import express from 'express'
import {login} from '../controllers/auth.js'
import { updatechannelData,getallChannels } from '../controllers/channel.js';

const routes = express.Router();
routes.post('/login', login)
routes.patch('/update/:id', updatechannelData)
routes.get('/getallchannel', getallChannels)
export default routes;

