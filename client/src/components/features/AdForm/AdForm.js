import { useState } from "react";
import { Form, Button } from "react-bootstrap";
const AdForm = ({ action, ...adData }) => {
  const [title, setTitle] = useState(adData.title || "");
  const [description, setDescription] = useState(adData.description || "");
  const [publishDate, setPublishDate] = useState(adData.publishDate || "");
  const [price, setPrice] = useState(adData.price || "");
  const [location, setLocation] = useState(adData.location || "");
  const [image, setImage] = useState(adData.image || null);
  const handleSubmit = () => {
    action({ title, description, publishDate, price, location, image });
  };
  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          type="text"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="Date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          value={publishDate}
          type="text"
          placeholder="Enter date"
          onChange={(e) => setPublishDate(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          value={price}
          type="text"
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          value={location}
          type="text"
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm
      </Button>
    </Form>
  );
};

export default AdForm;
