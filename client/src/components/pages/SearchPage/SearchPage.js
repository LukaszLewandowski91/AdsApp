import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds, loadSearchedAdsRequest } from "../../../redux/adsRedux";
import { Container, Row, Spinner } from "react-bootstrap";
import AdCard from "../../features/AdCard/AdCard";
const SearchPage = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);

  const { searchPhrase } = useParams();
  useEffect(() => {
    dispatch(loadSearchedAdsRequest(searchPhrase));
  }, [dispatch]);

  return (
    <Container>
      <Row className="mt-3">
        {ads.length === 0 && (
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

export default SearchPage;
