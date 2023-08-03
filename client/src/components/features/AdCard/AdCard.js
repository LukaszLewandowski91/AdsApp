import { Col, Card, Button } from "react-bootstrap";
import { IMGS_URL } from "../../../config";
import styles from "./AdCard.module.scss";
import { Link } from "react-router-dom";
const AdCard = ({ ...ad }) => {
  return (
    <Col lg={3} md={6} sm={12} className="mb-4">
      <Card>
        <Card.Img
          className={styles.img}
          variant="top"
          src={`${IMGS_URL}${ad.image}`}
        />
        <Card.Body>
          <Card.Title>{ad.title}</Card.Title>
          <Card.Text>{ad.location}</Card.Text>
          <Link to={`/ads/${ad._id}`}>
            <Button variant="primary">Read more</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default AdCard;
