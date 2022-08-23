import React from "react";
import { Card } from "react-bootstrap";

import upVote from "../assets/up-vote.svg";
import comment from "../assets/comment.svg";
import eye from "../assets/eye.svg";

const Tile = (props) => {
  const { href, type, cover, title, upvoteCount, commentCount, viewCount } =
    props;
  return (
    <a href={href} className="text-decoration-none text-reset">
      <Card className="m-2 shadow">
        {type === "video/mp4" ? (
          <video src={cover} />
        ) : (
          <Card.Img variant="top" src={cover} />
        )}
        <Card.Body>
          <Card.Text className="">{title}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex align-item-center justify-content-between">
          <div className="d-flex align-items-center">
            <img src={upVote} alt="up-vote" />
            {upvoteCount}
          </div>
          <div className="d-flex align-items-center">
            <img src={comment} alt="comment" />
            {commentCount}
          </div>
          <div className="d-flex align-items-center">
            <img src={eye} alt="eye" />
            {viewCount}
          </div>
        </Card.Footer>
      </Card>
    </a>
  );
};

export default Tile;
