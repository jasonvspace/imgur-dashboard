import React from "react";
import { Form } from "react-bootstrap";

import { debounce } from "lodash";

const Search = (props) => {
  const { setQuery } = props;

  const handleSearch = debounce((event) => {
    setQuery(event.target.value);
  }, 500);

  return (
    <Form.Control type="text" placeholder="Search..." onChange={handleSearch} />
  );
};

export default Search;
