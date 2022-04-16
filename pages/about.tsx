import AuthorInfo from "@/components/BizView/AuthorInfo";
import { getArticleInfo } from "@/servers/article";
import { markedContent } from "@/utils/mdutil";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
// import ArticleCatalog from "../components/BizView/ArticleCatalog";
// import RelatedArticle from "../components/BizView/RelatedArticle";
import CommentArea from "../components/BizView/CommentArea";

import PageHeader from "../components/BizView/PageHeader";
interface AboutPageProps {
  // articleInfo: ApiResponse<Article>;
  articleHtml: string;
}
const AboutPage: NextPage<AboutPageProps> = ({ articleHtml }) => {
  return (
    <div className="page-container">
      <Head>
        <title>关于-王嘉炀·个人博客</title>
      </Head>
      <PageHeader></PageHeader>

      <main className="main-constainer" style={{ maxWidth: 960 }}>
        <section className="main-content">
          <article className="article-box">
            <div className="markdown-body">
              <div dangerouslySetInnerHTML={{ __html: articleHtml }}></div>
            </div>
          </article>
          <AuthorInfo style={{ marginTop: 16 }}></AuthorInfo>
          <CommentArea tid="1" title="关于" type="article" />
        </section>
      </main>
    </div>
  );
};

export default AboutPage;

export const getServerSideProps: GetServerSideProps<AboutPageProps> = async () => {
  const id = "1";
  const [articleResp] = await Promise.all([getArticleInfo(id as string)]);

  const { html } = markedContent(articleResp?.data?.content);
  return {
    props: {
      articleHtml: html,
    },
  };
};
