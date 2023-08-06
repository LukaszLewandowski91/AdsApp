import { Container, Row } from "react-bootstrap";
import AdForm from "../../features/AdForm/AdForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdRequest } from "../../../redux/adsRedux";
import styles from "./NewAd.module.scss";
const NewAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (ad) => {
    const fd = new FormData();
    fd.append("title", ad.title);
    fd.append("description", ad.description);
    fd.append("publishDate", ad.publishDate);
    fd.append("price", ad.price);
    fd.append("location", ad.location);
    fd.append("image", ad.image);
    dispatch(addAdRequest(fd));
    navigate("/");
  };
  return (
    <Container>
      <Row className={styles.titleAction}>
        <h1>Add new advertisement</h1>
      </Row>
      <AdForm action={handleSubmit}></AdForm>
    </Container>
  );
};

export default NewAd;
