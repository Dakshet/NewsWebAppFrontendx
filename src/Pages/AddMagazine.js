import React, { useContext, useEffect, useState } from 'react'
import "./AddNews.css"
import NewsContext from '../Context/News/NewsContext';
import "./AddMagazine.css"
import { useNavigate } from 'react-router-dom';

const AddMagazine = ({ showAlert, showProfile, showAddMenu }) => {
    const Upload_Preset = process.env.REACT_APP_UPLOAD_PRESET_IMAGE;
    const Cloud_Name = process.env.REACT_APP_CLOUD_NAME;
    const Upload_Preset_PDF = process.env.REACT_APP_UPLOAD_PRESET_PDF;

    const navigate = useNavigate();

    const { addMagazine } = useContext(NewsContext);
    const [title, setTitle] = useState("");
    const [images, setImages] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        showAlert("Added Magazine Successfully!", "success");
        addMagazine(title, body, images);

        navigate("/magazine")

    }

    const postImage = async (image) => {

        const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/avif"];

        if (validImageTypes.includes(image.type)) {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", Upload_Preset);
            data.append("cloud_name", Cloud_Name);

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dpkaxrntd/image/upload", {
                    method: "post",
                    body: data,
                })

                if (response.ok) {
                    const json = await response.json();

                    if (json.url) {
                        setImages(json.url);
                        console.log(json.url);
                    }
                    else {
                        console.log(json.Error);
                    }
                }

                else {
                    console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                }

            } catch (error) {
                console.error("Error fetching the news:", error);
            }
        }
    }

    const postPdf = async (PDF) => {
        // console.log(typeof (PDF))

        const formData = new FormData();
        formData.append("file", PDF);
        formData.append("upload_preset", Upload_Preset_PDF);
        formData.append("cloud_name", Cloud_Name);

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dpkaxrntd/raw/upload", {
                method: "post",
                body: formData,
            })

            if (response.ok) {
                const json = await response.json();

                if (json.secure_url) {
                    setBody(json.secure_url);
                    console.log(json.secure_url)
                    // console.log(json.secure_url);
                }
                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
        }
    }

    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Add Magazine";  // Set the document title to the news title
    }, []);


    return (
        <div className={`addMagazine ${showProfile ? "userMenu" : ""}${showAddMenu ? "showMenu" : ""}`}>
            <div className="addMagazineInner">
                <h1>Add Magazine</h1>

                <div className="addMagazineForm">
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="image">Cover Image(JPEG/JPG/PNG)</label>
                        <input type="file" name='image' id='image' required onChange={(e) => postImage(e.target.files[0])} />
                        <label htmlFor="title">Upload Magazine(PDF)</label>
                        <input type="file" accept='application/pdf' onChange={(e) => postPdf(e.target.files[0])} required />
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' required onChange={(e) => setTitle(e.target.value)} minLength={3} />
                        <input className='submitBtn' disabled={images.length === 0 || body.length === 0} type="submit" value={images.length === 0 ? "Upload Image" : body.length === 0 ? "Upload PDF" : "POST"} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMagazine
