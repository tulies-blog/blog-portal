import React from "react";
import { Category } from "@/servers/article";
import Link from "next/link";
import { useRouter } from "next/router";

interface ArticleNavProps {
  categoryList: Category[];
}
const ArticleNav: React.FC<ArticleNavProps> = ({ categoryList }) => {
  const router = useRouter();
  return (
    <div className="view-nav">
      <div className="cate-nav-box">
        <nav className="cate-nav">
          <div className="nav-list left">
            <Link key="home" href={`/`}>
              <a className={`nav-item${router.pathname === "/" ? " active" : ""}`}>
                <div className="category-popover-box">综合</div>
              </a>
            </Link>
            {categoryList.map((cate) => (
              <Link key={cate.id} href={`/cate/${cate.urlName}`}>
                <a className={`nav-item${router.query.cate === cate.urlName ? " active" : ""}`}>
                  <div className="category-popover-box">{cate.name}</div>
                </a>
              </Link>
            ))}
            <Link key="cat-tag" href={"/tag"}>
              <a className="nav-item right">所有分类标签</a>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default ArticleNav;
