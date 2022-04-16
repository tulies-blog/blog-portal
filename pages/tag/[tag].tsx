import type { NextPage, GetServerSideProps } from "next";
import PageHeader from "@/components/BizView/PageHeader";
import ArticleList from "@/components/BizView/ArticleList";
// import axios from "axios";
import { Article, Category, getArticleList, getCategoryList } from "@/servers/article";
import { PaginationResult } from "@/@types";
import PageFooter from "@/components/BizView/PageFooter";
import styles from "./index.module.scss";
import Head from "next/head";
interface PageProps {
  tagName: string;
  defaultListData: PaginationResult<Article>;
  categoryList: Category[];
}
const Cate: NextPage<PageProps> = ({ tagName, defaultListData }) => {
  return (
    <div className={`page-container ${styles.tagPage}`}>
      <Head>
        <title>{tagName}-王嘉炀·个人博客</title>
      </Head>
      <PageHeader></PageHeader>
      <div className="tag-info-box">
        <div className="tag-info">
          <h1 className="title">{tagName}</h1>
          <div className="tag-meta">{defaultListData.total} 文章</div>
        </div>
      </div>
      <main className="main-constainer" style={{ maxWidth: 960 }}>
        <section className="main-content">
          <ArticleList data={defaultListData} params={{ tags: tagName }}></ArticleList>
        </section>
      </main>
      <PageFooter />
    </div>
  );
};

export default Cate;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { tag } = context.query;
  const [articleResp, categoryResp] = await Promise.all([
    getArticleList({
      tags: tag,
      pageNum: 1,
      pageSize: 10,
    }),
    getCategoryList(),
  ]);
  return {
    props: {
      tagName: tag as string,
      defaultListData: articleResp.data,
      categoryList: categoryResp.data,
    },
  };
};
