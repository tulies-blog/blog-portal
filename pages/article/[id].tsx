import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ArticleCatalog from "@/components/BizView/ArticleCatalog";
import RelatedArticle from "@/components/BizView/RelatedArticle";
// import { Button, ButtonGroup } from "react-bootstrap";
// import styles from "../styles/Home.module.css";
import PageHeader from "@/components/BizView/PageHeader";
import { Article, articleDigg, articleVisit, getArticleInfo, getRelatedList } from "@/servers/article";
import { ApiResponse } from "@/@types";
import { Empty } from "antd";
import CommentArea from "@/components/BizView/CommentArea";
import { useEffect, useState } from "react";
import PageFooter from "@/components/BizView/PageFooter";
import { markedContent, TocItem } from "@/utils/mdutil";
import styles from "./article.module.scss";
import IconFont from "@/components/IconFont";
import { useThrottleFn } from "ahooks";
import { useRouter } from "next/router";
import AuthorInfo from "@/components/BizView/AuthorInfo";

// import { getQueryString } from "@/utils/fn";
interface ArticlePageProps {
  articleInfo: ApiResponse<Article>;
  articleHtml: string;
  articleToc: TocItem[];
  relatedList: Article[];
}

const ArticlePage: NextPage<ArticlePageProps> = ({ articleInfo, articleHtml, articleToc, relatedList = [] }) => {
  const [article, setArticle] = useState(articleInfo?.data);
  const router = useRouter();
  const id = router.query.id as string;
  // const id = getQueryString("id");
  //   const [tocTree, setTocTree] = useState<TocItem[]>([]);
  //   function markedContent(content: string) {
  //     const toclist: TocItem[] = [];
  //     // Get reference
  //     const renderer = new marked.Renderer();
  //     // Override function
  //     // renderer.heading = function (text: string, level: number) {
  //     //   // var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  //     //   let escapedText = text
  //     //     .toLowerCase()
  //     //     .replace(/[^(\u4E00-\u9FA5A-Z0-9a-z)]+/g, "");
  //     //   escapedText = pinyin.getFullChars(escapedText).substring(0, 32);
  //     //   // const rd = utils.getUUID()
  //     //   // const aname = escapedText
  //     //   return `
  //     //            <h${level} data-id="${escapedText}" title="${text}">
  //     //              <a name="${escapedText}" className="heading-anchor" href="#${escapedText}">
  //     //                <span className="header-link"></span>
  //     //              </a>
  //     //              ${text}
  //     //            </h${level}>`;
  //     // };
  //     renderer.heading = function (text: string, level: number) {
  //       const escapedText = text.replace(/[^(\u4E00-\u9FA5A-Z0-9a-z)]+/g, "-");
  //       // const rd = utils.getUUID()
  //       // const aname = escapedText
  //       console.log(text, level);
  //       toclist.push({ id: escapedText, text, level });
  //       return `<h${level} id="${escapedText}" title="${text}">
  //                  ${text}
  //                </h${level}>`;
  //     };
  //     marked.setOptions({ breaks: true, renderer });
  //     // return marked(content);
  //     const html = marked(content);
  //     const tocs = createToc(toclist);
  //     setTocTree(tocs);
  //     return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
  //   }
  useEffect(() => {
    console.log(articleInfo?.data);
    articleVisit(id);
    getArticleInfo(id).then((res) => {
      setArticle(res.data);
    });
  }, [id]);

  // 走防抖
  const { run: handleDiggRun, cancel: handleDiggCancel } = useThrottleFn(
    () => {
      articleDigg(article.id, article.isDigg ? 0 : 1).finally(() => {
        handleDiggCancel();
      });
      // 直接执行，速度快点
      // setArticle({
      //   ...article,
      //   diggCount: article.userInteract?.isDigg ? article.diggCount - 1 : article.diggCount + 1,
      //   userInteract: {
      //     ...article.userInteract,
      //     isDigg: article.userInteract?.isDigg ? 0 : 1,
      //   } as ArticleInteract,
      // });

      setArticle({
        ...article,
        isDigg: article.isDigg ? 0 : 1,
        diggCount: article.isDigg ? article.diggCount - 1 : article.diggCount + 1,
      });
    },
    {
      wait: 2000,
    }
  );
  function handleDigg(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    handleDiggRun();
  }

  return (
    <div className="page-container detail-page">
      <Head>
        {article?.title && <title>{article?.title}</title>}
        {article?.description && <meta name="description" content={article?.description} />}
      </Head>
      <PageHeader></PageHeader>

      <main className={`main-constainer ${styles.articlePage}`}>
        <section className="main-content">
          {articleInfo && articleInfo.data ? (
            <>
              <article className="article-box">
                <h1 className="article-title">{articleInfo.data.title}</h1>
                <div className="author-info-block">
                  <div className="author-info-box">
                    <div className="meta-box">
                      <span className="time">发表于：{articleInfo.data.createTime}</span>
                      <span>·</span>
                      <span className="views-count">阅读：{articleInfo.data.pv}</span>
                    </div>
                  </div>
                </div>
                <div className="markdown-body">
                  <div dangerouslySetInnerHTML={{ __html: articleHtml }}></div>
                </div>
              </article>
              <a id="blog-comment"></a>
              <CommentArea tid={articleInfo.data.id} title={articleInfo.data.title} type="article" />
            </>
          ) : (
            <article className="article-box">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"文章不存在或获取文章失败"} />
            </article>
          )}
        </section>
        <aside className="aside index-aside">
          <AuthorInfo></AuthorInfo>
          <RelatedArticle blockTitle="相关文章" data={relatedList} />
          <ArticleCatalog data={articleToc} />
        </aside>
        <div className="article-suspended-panel">
          <div
            className={`panel-btn with-badge ${article.isDigg ? "active" : ""}`}
            data-badge={article.diggCount}
            onClick={handleDigg}
          >
            <IconFont type="icon-dianzan_kuai"></IconFont>
          </div>
          <div
            className="panel-btn with-badge"
            data-badge={article.commentCount}
            onClick={() => {
              location.href = "#blog-comment";
            }}
          >
            <IconFont type="icon-comment-filling"></IconFont>
          </div>
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

export default ArticlePage;
export const getServerSideProps: GetServerSideProps<ArticlePageProps> = async (context) => {
  const { id } = context.query;
  const [articleResp, relatedResp] = await Promise.all([
    getArticleInfo(id as string),
    getRelatedList({ pagesize: 5, id }),
  ]);

  const { html, toc } = markedContent(articleResp?.data?.content);
  return {
    props: {
      articleInfo: articleResp,
      articleHtml: html,
      articleToc: toc,
      relatedList: relatedResp.data,
    },
  };
};
