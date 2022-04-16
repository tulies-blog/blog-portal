import type { NextPage } from "next";
import Head from "next/head";
// import ArticleCatalog from "../components/BizView/ArticleCatalog";
// import RelatedArticle from "../components/BizView/RelatedArticle";
import CommentArea from "../components/BizView/CommentArea";

import PageHeader from "../components/BizView/PageHeader";

const Comment: NextPage = () => {
  return (
    <div className="page-container detail-page">
      <Head>
        <title>留言板-王嘉炀·个人博客</title>
      </Head>
      <PageHeader></PageHeader>

      <main className="main-constainer" style={{ maxWidth: 960 }}>
        <section className="main-content">
          <article className="article-box">
            <h1 className="article-title">留言板</h1>
            <div className="author-info-block">
              {/* <div className="author-info-box">
                <div className="meta-box">
                  <span className="time">发表于：2022年02月10日 18:01</span>
                  <span>·</span>
                  <span className="views-count">阅读：196</span>
                </div>
              </div> */}
              {/* <button type="button" className="btn btn-outline-primary">
                Primary
              </button> */}
            </div>
            <div className="markdown-body">
              {/* <p>
                「这是我参与2022首次更文挑战的第2天，活动详情查看：
                <a
                  href="https://juejin.cn/post/7052884569032392740"
                  title="https://juejin.cn/post/7052884569032392740"
                  target="_blank"
                  rel="noreferrer"
                >
                  2022首次更文挑战
                </a>
                」
              </p> */}
              <blockquote>
                {/* <p>
                  由于已经接触过不少<code>B/S结构</code>项目，于是希望以
                  <code>C/S</code>结构来构建一个项目，而<code>socket</code>
                  通信就多用于此。本文章中会主要介绍客户端与服务端建立
                  <code>WebSocket</code>
                  连接的方式，消息的封装，消息的加密，及一些常见问题。
                </p> */}
                <p>
                  请大家<code>文明上网</code>、<code>理性发言</code>，不要乱发广告！
                </p>
                <p>若您希望与我互动，请留言时留下您的邮箱，我会在看到后给你发送邮件。</p>
              </blockquote>
            </div>
          </article>
          <CommentArea tid="1" title="关于" type="article" />
        </section>

        {/* <aside className="aside index-aside">
          <RelatedArticle />
        </aside> */}
      </main>
    </div>
  );
};

export default Comment;
