import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './SellPage.css';  // Import the CSS file
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SellPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !price || !description || !image) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      toast.error('Please enter a valid price.');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `ads/${image.name}`);

      // 1. Upload the image
      await uploadBytes(storageRef, image);

      // 2. Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // 3. Create new ad object with real image URL
      const newAd = {
        title,
        category,
        price,
        description,
        imageUrl: downloadURL,
        createdAt: new Date(),
      };

      // 4. Save the ad to Firestore
      const db = getFirestore();
      await addDoc(collection(db, "ads"), newAd);

      console.log('New Ad:', newAd);

      toast.success('Ad posted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);

      // Reset the form
      setTitle('');
      setCategory('');
      setPrice('');
      setDescription('');
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error posting ad:", error);
      toast.error('Failed to post ad.');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <nav>
      <ToastContainer />
      <div className="sell-page-header">
        <FontAwesomeIcon className="back-button" icon={faArrowLeft} onClick={handleBackClick} />
      </div>

      <div className="sell-page-container">
        <div className="form-container">
          <h1 className="form-title">POST YOUR AD</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Enter the Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter ad title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option>Select Category</option>
                <option>Cars</option>
                <option>Mobiles</option>
                <option>Bikes</option>
                <option>Furniture</option>
                <option>Fashion</option>
                <option>Pets</option>
                <option>Properties</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price *</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include condition, features, and reason for selling"
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Image *</label>
              <div
                className="image-upload-area"
                onClick={handleImageClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="file-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="image-preview" />
                ) : (
                  <span className="upload-text">Drag and drop or click to upload an image</span>
                )}
              </div>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default SellPage;
