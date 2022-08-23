import React, { useState, useEffect } from "react";
import "./App.scss";
import { Container, Spinner, Card, Form } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { debounce } from "lodash";

import upVote from "./assets/up-vote.svg";
import comment from "./assets/comment.svg";
import eye from "./assets/eye.svg";

import gallaryApi from "./services/gallary";
function App() {
  const [gallary, setGallary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    gallaryApi
      .listGallary(query)
      .then((resp) => {
        setGallary(resp.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  const handleSearch = debounce((event) => {
    setQuery(event.target.value);
  }, 500);

  return (
    <div className="App">
      <Container className="py-5">
        <Form.Control
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </Container>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 2,
              500: 3,
              750: 3,
              900: 4,
              1200: 5,
            }}
          >
            <Masonry>
              {gallary.map((item) => {
                if (!item.images || item.images.length === 0) return null;
                const type = item.images[0].type;
                const cover = item.images[0].link;
                return (
                  <a
                    key={item.id}
                    href={item.link}
                    className="text-decoration-none text-reset"
                  >
                    <Card className="m-2 shadow">
                      {type === "video/mp4" ? (
                        <video src={cover} />
                      ) : (
                        <Card.Img variant="top" src={cover} />
                      )}
                      <Card.Body>
                        <Card.Text className="">{item.title}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="d-flex align-item-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <img src={upVote} alt="up-vote" />
                          {item.ups}
                        </div>
                        <div className="d-flex align-items-center">
                          <img src={comment} alt="comment" />
                          {item.comment_count}
                        </div>
                        <div className="d-flex align-items-center">
                          <img src={eye} alt="eye" />
                          {item.views}
                        </div>
                      </Card.Footer>
                    </Card>
                  </a>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </Container>
      )}
    </div>
  );
}

export default App;
