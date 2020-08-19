import React from "react";
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  return (
    <div className="card">
      <h>
        <a href={repo.html_url}>{repo.name}</a>
      </h>
    </div>
  );
};
RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
