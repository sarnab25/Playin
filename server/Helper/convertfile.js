import {exec} from "child_process"
import path from "path"
import Resolution from "../models/resolution.js"


const resolutions =[
    {name:'320p', width:320},
    {name:'480p', width:480},
    {name:'720p', width:720},
    {name:'1080p', width:1080},
];

 export const  convertVideo=async(filepath, filename,videoId, callback) =>
 {
    try{

 
    const tasks =resolutions.map(async res=>{
const outDir=path.join('uploads', 'resolution',res.name)
const outPath= path.join(outDir, filename);
  
const command= `ffmpeg -i ${filepath} -vf scale=${res.width}:-2 ${outPath}`;
return new Promise((resolve, reject)=>
{
    exec(command, async(error, stdout,stderr)=>
    {
        if(error) {
            console.log(`Error converting video ${res.name}:`, error)
            reject(error)
        }
        else{

            const resolution=new Resolution({
                resolution:res.name,
                filepath:outPath,
                video:videoId,
            })
            await resolution.save();
            resolve({ name: res.name, path: outPath });        }

    })
})
})
const results=await Promise.all(tasks);
callback(null, results);
    } catch(error)
    {
        callback(error);
    }
 }
