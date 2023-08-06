import { useNavigate, useParams } from "react-router-dom";
import { getAdById, removeAdRequest } from "../../../redux/adsRedux";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Image,
  InputGroup,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { IMGS_URL } from "../../../config";
import styles from "./AdDetails.module.scss";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const AdDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const adData = useSelector((state) => getAdById(state, id));

  const handleSubmit = (id) => {
    dispatch(removeAdRequest(id));
    navigate("/");
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={6} className={styles.imageContainer}>
          <Image
            src={`${IMGS_URL}${adData.image}`}
            fluid
            rounded
            className={styles.image}
          />
        </Col>
        <Col lg={6}>
          <InputGroup className="my-3 mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="py-1"
            >
              <Form.Control value={adData.title} aria-label="title" disabled />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Description"
              className="py-1"
            >
              <Form.Control
                as="textarea"
                aria-label="Description"
                value={adData.description}
                disabled
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Price"
              className="py-1"
            >
              <Form.Control
                value={`$ ${adData.price}`}
                aria-label="Price"
                disabled
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Publish Date"
              className="py-1"
            >
              <Form.Control
                aria-label="Publish date"
                value={adData.publishDate}
                disabled
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Seller"
              className="py-1"
            >
              <Form.Control
                aria-label="Seller"
                value={adData.userId.login}
                disabled
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Phone"
              className="py-1"
            >
              <Form.Control
                aria-label="PhoneNumber"
                value={adData.userId.phoneNumber}
                disabled
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Location"
              className="py-1"
            >
              <Form.Control
                aria-label="Location"
                value={adData.location}
                disabled
              />
            </FloatingLabel>
          </InputGroup>
          {user && user.login === adData.userId.login && (
            <Row>
              <Col lg={6} sm={12} className={styles.imageContainer}>
                <Link to={`/edit/${id}`}>
                  <Button variant="primary" className={styles.button}>
                    Edit
                  </Button>
                </Link>
              </Col>
              <Col lg={6} sm={12} className={styles.imageContainer}>
                <Button
                  variant="outline-danger"
                  className={styles.button}
                  onClick={() => handleSubmit(id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdDetails;
