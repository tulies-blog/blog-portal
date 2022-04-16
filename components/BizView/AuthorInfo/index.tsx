import Image from "next/image";
import scanMp from "@/assets/imgs/scan-mp.png";
import React from "react";
type AuthorInfoProps = React.HTMLAttributes<HTMLDivElement>;
const AuthorInfo: React.FC<AuthorInfoProps> = (props) => {
  return (
    <div className="sidebar-block" {...props}>
      <Image src={scanMp} alt="微信扫一扫关注"></Image>
    </div>
  );
};
export default AuthorInfo;
