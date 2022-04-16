import { Article } from "@/servers/article";
import Link from "next/link";
import React from "react";

interface RelatedArticleProps {
  blockTitle?: string;
  data: Article[];
}
const RelatedArticle: React.FC<RelatedArticleProps> = ({ data = [], blockTitle = "文章推荐" }) => {
  return (
    <div className="sidebar-block related-entry-sidebar-block">
      <div className="block-title">{blockTitle}</div>
      <div className="block-body">
        <div className="entry-list">
          {data.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <a target="_blank" rel="" title={article.title} className="item">
                <div className="entry-title">{article.title}</div>
                <div className="entry-meta-box">
                  <div className="entry-meta">{article.diggCount}点赞</div>
                  <div className="entry-meta">&nbsp;·&nbsp;</div>
                  <div className="entry-meta">{article.commentCount}评论</div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticle;
