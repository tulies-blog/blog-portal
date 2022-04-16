import { Category, getCategoryList } from "@/servers/article";
import { Skeleton } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ArticleCategory: React.FC = () => {
  const [listData, setListData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getCategoryList()
      .then((res) => {
        // console.log("文章汇总", res);
        setListData(res.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="sidebar-block catagory-block">
      <nav className="article-catagory">
        <div className="block-title">文章分类</div>
        <div className="block-body catagory-body">
          {loading ? (
            <div style={{ padding: "0 16px 24px 16px" }}>
              <Skeleton loading={true} active></Skeleton>
            </div>
          ) : (
            <ul className="catagory-list" style={{ marginTop: 0 }}>
              {listData.map((cate) => (
                <li key={cate.id} className="item d1">
                  <Link href={`/cate/${cate.url_name}`}>
                    <a className="a-container">
                      <span title={cate.name} className="category-name">
                        {cate.name}
                      </span>
                      <span className="count">{cate.articleCount}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};
export default ArticleCategory;
