import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { Spinner, Container, Row, Button } from "react-bootstrap";
import AdCard from "../AdCard/AdCard";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const AdsBoard = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {user && (
          <Link to="/add" className="mb-4">
            <Button variant="primary">Add advertisement</Button>
          </Link>
        )}
        {!ads && (
          <Spinner
            animation="border"
            variant="primary"
            className="d-block mx-auto my-4"
          />
        )}
        {ads.map((ad) => (
          <AdCard key={ad._id} {...ad} />
        ))}
      </Row>
    </Container>
  );
};

export default AdsBoard;
