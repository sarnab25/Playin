import videofile from "../models/videofile.js";
import { convertVideo} from "../Helper/convertfile.js"
import resolution from "../models/resolution.js";
export const uploadvideo=async(req,res)=>
{
    console.log("Received file:", req.file);
    console.log("Received body:", req.body);
    if(req.file===undefined)
    {
        res.status(400).json({message:"please upload a mp4 file only"})
    }

    else{
        try{
            const file = new videofile({
                videotitle:req.body.title,
                filename:req.file.originalname,
                filepath:req.file.path,
                filetype:req.file.mimetype,
                filesize:req.file.size,
                videochannel:req.body.channel,
                Uploader:req.body.Uploader,
                
            })

            
            
            convertVideo(req.file.path, req.file.originalname, file._id, async(err, results)=>
            {
                if(err)
                {
                    res.status(500).json({message:"Error in video process, render using old version of ffmpeg/Can't handle the error as it requires subscription"})
                    return;
                }

                const resolutionMap = results.reduce((acc, { name, path }) => {
                    acc.set(name, path);
                    return acc;
                }, new Map());

                file.resolutions=resolutionMap;
                await file.save();
                console.log(file);
                res.status(200).send("File Uploaded Successfully")
            })
         
        }
        catch(error)
        {
res.status(405).json(error.message)
return
        }
    }
}

export const getallVideo= async(req,res)=>
{
   try{
    const files =await videofile.find();
    res.status(200).send(files)
   }

   catch(error)
   {
    res.status(405).json(error.messsage)
    return
   }
}