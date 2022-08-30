import React from "react";
import styled from "styled-components";

const AvatarImg = styled.img`
  max-width: 100%;
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: cover;
  vertical-align: middle;
`;

const ProfileAvatar = ({ avatarUrl }) => {
  const avatarImg = {
    maxWidth: "100%",
    borderRadius: "50%",
    aspectRatio: "1",
    objectFit: "cover",
    verticalAlign: "middle",
  };

  return <AvatarImg src={avatarUrl} />;
};

export default ProfileAvatar;
