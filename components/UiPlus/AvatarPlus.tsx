import { Avatar, AvatarProps } from "antd";
import React from "react";

interface AvatarPlusProps extends AvatarProps {
  username: string;
}
// const colors = [
//   { color: "#f56a00", backgroundColor: "#fde3cf" },
//   { backgroundColor: "#87d068" },
//   { backgroundColor: "#40a9ff" },
//   { backgroundColor: "#1e80ff" },
// ];
const AvatarPlus: React.FC<AvatarPlusProps> = ({ username, ...props }) => {
  return (
    <Avatar {...props} style={{ backgroundColor: "#1e80ff" }}>
      {username.length > 3 ? username.substring(0, 2) : username.length == 3 ? username.substring(1, 3) : username}
    </Avatar>
  );
};
export default AvatarPlus;
