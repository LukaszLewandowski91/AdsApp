import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const SearchForm = () => {
  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <Form>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Link to={`/search/${searchPhrase}`}>
            <Button type="submit">Submit</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
