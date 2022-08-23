import React, { useState, useEffect } from "react";
import "./App.scss";
import { Container, Spinner } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Search from "./components/Search";
import Tile from "./components/Tile";

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

  return (
    <div className="App">
      <Container className="py-5">
        <Search setQuery={setQuery} />
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
                  <Tile
                    key={item.id}
                    href={item.link}
                    type={type}
                    cover={cover}
                    title={item.title}
                    upvoteCount={item.ups}
                    commentCount={item.comment_count}
                    viewCount={item.views}
                  ></Tile>
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
