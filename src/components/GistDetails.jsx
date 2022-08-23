import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";
import { parseISO, formatDistanceToNow } from "date-fns";

const GistDetailsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const GistFileName = styled.p`
  color: #0773ff;
`;

const GistFileDate = styled.p`
  font-size: 12px;
`;

const GistDetails = ({ gistData }) => {
  let timeAgo = "";
  const filesList = Object.keys(gistData.files)[0];
  const fileName = gistData.files[filesList].filename.substring(0, 15);
  const date = parseISO(gistData.created_at);
  const timePeriod = formatDistanceToNow(date);
  timeAgo = `${timePeriod} ago`;
  return (
    <GistDetailsDiv>
      <Link
        to={`/gist/${gistData.id}`}
        style={{ width: "35px", display: "inline-block" }}
      >
        <ProfileAvatar avatarUrl={gistData.owner.avatar_url} />
      </Link>
      <div>
        <GistFileName>
          <span>{gistData.owner.login}</span> / <span>{fileName}</span>
        </GistFileName>
        <GistFileDate>Created {timeAgo}</GistFileDate>
      </div>
    </GistDetailsDiv>
  );
};

export default GistDetails;
