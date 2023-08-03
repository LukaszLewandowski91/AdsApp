import { useParams } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import { IMGS_URL } from "../../../config";

const AdDetails = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  console.log(adData);
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={6}>
          <Image src={`${IMGS_URL}${adData.image}`} fluid rounded />
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
};

export default AdDetails;
