import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ArticleCategory from "@/components/BizView/ArticleCategory";
// import RelatedArticle from "../../components/BizView/RelatedArticle";

// import { Button, ButtonGroup } from "react-bootstrap";
// import styles from "../styles/Home.module.css";
import PageHeader from "../../components/BizView/PageHeader";
import { Button, Timeline } from "antd";
import styles from "./index.module.scss";
import { Article, getArticleList } from "@/servers/article";
import moment from "moment";
import Link from "next/link";
import PageFooter from "@/components/BizView/PageFooter";
import AuthorInfo from "@/components/BizView/AuthorInfo";

interface TimeLinePageProps {
  articleList: Record<string, Article[]>;
}
const TimeLinePage: NextPage<TimeLinePageProps> = ({ articleList }) => {
  return (
    <div className={`page-container ${styles.timelinePage}`}>
      <Head>
        <title>文章归档-王嘉炀·个人博客</title>
      </Head>
      <PageHeader></PageHeader>
      <main className="main-constainer">
        <section className="main-content">
          {Object.keys(articleList)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((key) => (
              <section key={key} className="article-timeline-box">
                <Timeline>
                  <Timeline.Item
                    dot={
                      <Button size="small" type="primary">
                        {key}
                      </Button>
                    }
                  >
                    &nbsp;
                  </Timeline.Item>
                  {articleList[key].map((article) => (
                    <Timeline.Item key={article.id}>
                      <div className="timeline-content">
                        <div className="date">{article.createTime.substring(0, 10)}</div>
                        <div className="title">
                          <Link href={`/article/${article.id}`}>
                            <a target="_blank" rel="noreferrer">
                              {article.title}
                            </a>
                          </Link>
                        </div>
                        <div className="meta-container">
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
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </section>
            ))}

          <section key={`last`} className="article-timeline-box">
            <Timeline>
              <Timeline.Item
                dot={
                  <Button size="small" type="primary">
                    最后
                  </Button>
                }
              >
                &nbsp;
              </Timeline.Item>
              <Timeline.Item>
                <div className="timeline-content">
                  <div className="markdown-body" style={{ padding: 0 }}>
                    写在最后：
                    <blockquote>
                      <code>大家一定要记得数据库定时备份</code>😭😭😭
                    </blockquote>
                  </div>
                </div>
              </Timeline.Item>
            </Timeline>
          </section>
        </section>
        <aside className="aside index-aside">
          <AuthorInfo></AuthorInfo>
          <ArticleCategory />
        </aside>
      </main>
      <PageFooter />
    </div>
  );
};

export default TimeLinePage;

function groupBy(list: Article[]) {
  const groups: Record<string, Article[]> = {};
  list.forEach(function (article) {
    //注意这里必须是forEach 大
    const year = moment(article.createTime, "YYYY-MM-DD HH:mm:ss").year();
    groups[`${year}`] = groups[`${year}`] || [];
    groups[`${year}`].push(article);
  });
  return groups;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("query", context.query);
  const { cate } = context.query;
  const category = (cate && cate[0]) || null;
  const pageNum = (cate && cate[1]) || 1;
  const [articleResp] = await Promise.all([
    getArticleList({
      category,
      pageNum,
      pageSize: 100,
    }),
  ]);

  const list = articleResp.data.list;
  const articlesOfYear = groupBy(list);
  return {
    props: {
      articleList: articlesOfYear,
    },
  };
};
