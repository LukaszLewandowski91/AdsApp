import AdForm from "../../features/AdForm/AdForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAdRequest, getAdById } from "../../../redux/adsRedux";
import { Container, Row } from "react-bootstrap";
import styles from "./EditAd.module.scss";
const EditAd = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (ad) => {
    const fd = new FormData();
    fd.append("title", ad.title);
    fd.append("description", ad.description);
    fd.append("publishDate", ad.publishDate);
    fd.append("price", ad.price);
    fd.append("location", ad.location);
    fd.append("image", ad.image);
    dispatch(editAdRequest(fd, id));
    navigate("/");
  };
  return (
    <Container>
      <Row className={styles.titleAction}>
        <h1>Edit</h1>
      </Row>
      <AdForm {...adData} action={handleSubmit} />
    </Container>
  );
};

export default EditAd;
