import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import Ads from "../Ads/Ads";
import { API_URL } from "../../../config";

const AdsBoard = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  {
    !ads && (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto my-4"
      />
    );
  }
  // {
  //   ads.length === 0 && <Alert variant="warning">No Ads</Alert>;
  // }
  // {
  //   ads && ads.length > 0 && <Alert variant="success">OK</Alert>;
  // }
};

export default AdsBoard;
