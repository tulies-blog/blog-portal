import { Article, articleDigg } from "@/servers/article";
import { getDateDiff } from "@/utils/fn";
import { useDidUpdateEffect } from "@/utils/hooks/useDidUpdateEffect";
import { useThrottleFn } from "ahooks";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./index.module.scss";
interface ArticleItemProps {
  data: Article;
}
const ArticleItem: React.FC<ArticleItemProps> = (props) => {
  const { data } = props;
  const [article, setArticle] = useState(data);
  useDidUpdateEffect(() => {
    setArticle(article);
  }, [data]);
  // 走防抖
  const { run: handleDiggRun, cancel: handleDiggCancel } = useThrottleFn(
    () => {
      articleDigg(article.id, article.isDigg ? 0 : 1).finally(() => {
        handleDiggCancel();
      });
      // 直接执行，速度快点
      setArticle({
        ...article,
        diggCount: article.isDigg ? article.diggCount - 1 : article.diggCount + 1,
        isDigg: article.isDigg ? 0 : 1,
      });
    },
    {
      wait: 2000,
    }
  );
  function handleDigg(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    e.stopPropagation();
    handleDiggRun();
  }
  function handldeComment(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    e.stopPropagation();
    window.open(`/article/${article.id}#comment`);
  }
  function handleArticle() {
    window.open(`/article/${article.id}`);
  }
  return (
    <div className={styles.articleWrapper} onClick={handleArticle}>
      <div className="article-item-content">
        <div className="meta-container">
          <div className="date">{getDateDiff(article.createTime)}</div>
          <div className="tag-list">
            <Link href={`/cate/${article.category.urlName}`}>
              <a className="tag link-normal">{article.category.name}</a>
            </Link>
          </div>
          <div className="tag-list">
            {article.tags.split(",").map((d) => (
              <Link key={d} href={`/tag/${d}`}>
                <a className="tag link-normal">{d}</a>
              </Link>
            ))}
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content-main">
            <div className="title-row">
              <Link href={`/article/${article.id}`}>
                <a target="_blank" title={article.title} className="title" rel="noreferrer">
                  {article.title}
                </a>
              </Link>
            </div>
            <div className="abstract">
              <Link href={`/article/${article.id}`}>
                <a target="_blank" rel="noreferrer">
                  {article.description}
                </a>
              </Link>
            </div>
            <ul className="action-list jh-timeline-action-area">
              <li className="item view">
                <i></i>
                <span>{article.pv}</span>
              </li>
              <li className={`item like ${article.isDigg && "active"}`} onClick={handleDigg}>
                <i></i>
                <span>{article.diggCount}</span>
              </li>
              <li className="item comment" onClick={handldeComment}>
                <i></i>
                <span>{article.commentCount}</span>
              </li>
            </ul>
          </div>
          {article.poster && <img src={article.poster} alt="渣本毕业的我，2021年终于进了大厂" className="lazy thumb" />}
        </div>
      </div>
    </div>
  );
};
export default ArticleItem;
