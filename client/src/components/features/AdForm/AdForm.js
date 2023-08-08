import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IMGS_URL } from "../../../config";
import styles from "./AdForm.module.scss";
const AdForm = ({ action, ...adData }) => {
  const [title, setTitle] = useState(adData.title || "");
  const [description, setDescription] = useState(adData.description || "");
  const [publishDate, setPublishDate] = useState(adData.publishDate || "");
  const [price, setPrice] = useState(adData.price || "");
  const [location, setLocation] = useState(adData.location || "");
  const [image, setImage] = useState(adData.image || null);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(!titleError);
    setDescriptionError(!descriptionError);
    setDateError(!dateError);
    setPriceError(!priceError);
    setLocationError(!locationError);
    setImageError(!imageError);
    if (title && description && publishDate && price && location && image) {
      action({ title, description, publishDate, price, location, image });
    }
  };

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && !title && (
          <small className="d-block form-text text-danger mt-2">
            Title is required
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          type="text"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionError && !description && (
          <small className="d-block form-text text-danger mt-2">
            Description is required
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="Date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          value={publishDate}
          type="date"
          placeholder="Enter date"
          onChange={(e) => setPublishDate(e.target.value)}
        />
        {dateError && !publishDate && (
          <small className="d-block form-text text-danger mt-2">
            Date is required
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          value={price}
          type="number"
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
        />
        {priceError && !price && (
          <small className="d-block form-text text-danger mt-2">
            Price is required
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          value={location}
          type="text"
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
        />
        {locationError && !location && (
          <small className="d-block form-text text-danger mt-2">
            Location is required
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
        <div className={styles.imageBox}>
          <Form.Control
            type="file"
            onChange={(e) => (
              setImage(e.target.files[0]), setImageChange(true)
            )}
          />
          {image && !imageChange && (
            <img
              src={`${IMGS_URL}${image}`}
              className={styles.image}
              alt={image}
            />
          )}
        </div>
        {imageError && !image && (
          <small className="d-block form-text text-danger mt-2">
            Image is required
          </small>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm
      </Button>
    </Form>
  );
};

export default AdForm;
