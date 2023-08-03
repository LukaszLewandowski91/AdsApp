import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { Spinner, Container, Row } from "react-bootstrap";
import AdCard from "../AdCard/AdCard";

const AdsBoard = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <Container>
      <Row>
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
