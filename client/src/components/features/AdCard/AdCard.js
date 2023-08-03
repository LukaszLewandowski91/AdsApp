import { Col, Card, Button } from "react-bootstrap";
import { IMGS_URL } from "../../../config";
import styles from "./AdCard.module.scss";
const AdCard = ({ title, image, location }) => {
  return (
    <Col lg={3} md={6} sm={12} className="mb-4">
      <Card>
        <Card.Img
          className={styles.img}
          variant="top"
          src={`${IMGS_URL}${image}`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{location}</Card.Text>
          <Button variant="primary">Read more</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default AdCard;
