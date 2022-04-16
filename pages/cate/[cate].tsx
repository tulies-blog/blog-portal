import type { NextPage, GetServerSideProps } from "next";
import RelatedArticle from "@/components/BizView/RelatedArticle";
import PageHeader from "@/components/BizView/PageHeader";
import ArticleCategory from "@/components/BizView/ArticleCategory";
import ArticleList from "@/components/BizView/ArticleList";
import ArticleNav from "@/components/BizView/ArticleNav";
import { Article, Category, getArticleList, getCategoryList } from "@/servers/article";
import { PaginationResult } from "@/@types";
import PageFooter from "@/components/BizView/PageFooter";
import { useRouter } from "next/router";
import AuthorInfo from "@/components/BizView/AuthorInfo";

interface PageProps {
  defaultListData: PaginationResult<Article>;
  categoryList: Category[];
  relatedList: Article[];
}

const Cate: NextPage<PageProps> = ({ defaultListData, categoryList, relatedList }) => {
  const router = useRouter();
  const { cate } = router.query;
  // categoryUrlName
  return (
    <div className="page-container index-page">
      <PageHeader></PageHeader>
      <ArticleNav categoryList={categoryList} />
      <main className="main-constainer">
        <section className="main-content">
          <ArticleList data={defaultListData} params={{ categoryUrlName: cate }}></ArticleList>
        </section>
        <aside className="aside index-aside">
          <AuthorInfo></AuthorInfo>
          <RelatedArticle blockTitle="文章推荐" data={relatedList} />
          <ArticleCategory />
        </aside>
      </main>
      <PageFooter />
    </div>
  );
};

export default Cate;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { cate } = context.query;
  const [articleResp, categoryResp, relatedResp] = await Promise.all([
    getArticleList({
      categoryUrlName: cate,
      pageNum: 1,
      pageSize: 10,
    }),
    getCategoryList(),
    getArticleList({
      categoryUrlName: cate,
      pageNum: 1,
      pageSize: 5,
      sorter: "isTop desc,createTime desc",
    }),
  ]);
  return {
    props: {
      defaultListData: articleResp.data,
      categoryList: categoryResp.data,
      relatedList: relatedResp.data.list,
    },
  };
};
