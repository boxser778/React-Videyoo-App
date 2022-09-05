import React, { useState } from 'react';
import { Typography, Form, Input } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {getCurrentUser} from "../../../services/userService"
import { toast } from "react-toastify";
import PageHeader from "../../common/pageHeader";
import "./UploadVideoPage.scss";

const apiUrl = process.env.REACT_APP_API_URL;
const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" }
]



function VideoUploadPage(props) {
    
    const user = getCurrentUser();

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const logedUser = getCurrentUser();
  if (logedUser === null) {
    window.location.href = "/";
  }

    const onDropFuc = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        if(files[0].type !== 'video/mp4'){
            toast.error(`only mp4 file allowed`);   
        }
        formData.append("file", files[0])

        Axios.post(`${apiUrl}/videos/uploadfiles`, formData, config)
            .then(response => {
                if(response.data.success){

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }
                 
                    setFilePath(response.data.url)

                    Axios.post(`${apiUrl}/videos/thumbnail`, variable)
                        .then(response => {
                            if(response.data.success){
                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)
                            } else {
                                alert("ERROR: Failed to display a thumbnail.")
                            }
                        })

                    }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }

       if(VideoTitle === ""){
        throw toast.error(`Must Set Title To a video!`);
       }

       if(FilePath === "") {
        throw toast.error(`Choose File to Upload!`)
       }

        Axios.post(`${apiUrl}/videos/uploadvideo`, variables)
            .then(response => {
                if(response.data.success){
                    toast.success(`Video is Uploaded Succesfully!`);
                     setTimeout(function () {
                                 window.location.replace("/");  
                     }, 1000);
                } else {
                    alert("ERROR: Failed to upload the video.")
                }
            })
        }
        
    return (
        <>
         <PageHeader
        title="Upload Video"
        subTitle="Upload the video you like, must fill all the fields below"
      />
     
        <div>
        <div style={{ maxWidth: '700px', margin: '2rem auto'}} className="container">
            <Form onSubmit={onSubmit}>
                <div className='dropZoneCon' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop = {onDropFuc}
                        multiple = {false}
                        maxsize = {100000000}
                    >
                        {({getRootProps, getInputProps}) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                            </div>
                        )}
                    </Dropzone>
                    
                    {ThumbnailPath &&
                   
                        <div className='image-con'>
                            <img src={`http://localhost:8181/${ThumbnailPath}`} alt="thumbnail" />      
                        </div>
                    }  
                </div>
                
                <br/><br/>

                <label className='upload-title'>Title</label>
                <br></br>
                <Input
                    onChange = {onTitleChange}
                    value = {VideoTitle}
                />
                
                <br/><br/>
                
                <label className='upload-description'>Description</label>
                <br></br>
                <TextArea
                    onChange = {onDescriptionChange}
                    value = {Description}
                />

                <br/><br/>

                <select onChange={onPrivateChange}> 
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/><br/>

                <select onChange={onCategoryChange}> 
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/><br/>
                <button className="neon-button" onClick={onSubmit}>Submit</button>
            </Form>
        </div>
        </div>
           </>
    );
}

export default VideoUploadPage
