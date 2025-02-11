import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const UploadForm = () => {

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPreset, setUploadPreset] = useState<string | null>(null);
  const [cloudName, setCloudName] = useState<string | null>(null);
  const [cloudUrl, setCloudUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await import.meta.env;
      setUploadPreset(result.VITE_UPLOAD_PRESET);
      setCloudName(result.VITE_CLOUDINARY_NAME);
      setCloudUrl(result.VITE_CLD_URL);
    };

    fetchData();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      let imageURL;

      if(profileImage){
        const image = new FormData();
        image.append("file", profileImage);
        image.append("upload_preset", uploadPreset);
        image.append("cloud_name", cloudName);
        fetch(cloudUrl, {
          method: "post",
          body: image,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            imageURL = data.url.toString();

            setImagePreview(null)
            alert(imageURL)
            setIsLoading(false)

            // save image url to database
            // axios.post('/api/profile', {imageURL})
            //   .then(res => {
            //     console.log(res);
            //     setIsLoading(false);
            //   })
            //   .catch(err => {
            //     console.log(err);
            //     setIsLoading(false);
            //   })
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }


    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
    <div>Upload Image</div>

    <form onSubmit={handleUpload}>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="profile"
          style={{ height: "200px" }}
        />
      )}

      <label> Photo : </label>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>


    </form>

    </>
  )
}

export default UploadForm
