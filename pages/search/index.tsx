import { PaginationResult } from "@/@types";
import { SearchOutlined } from "@ant-design/icons";
import { Article, getArticleList } from "@/servers/article";
import { Empty, Form, Input } from "antd";
import { GetServerSideProps, NextPage } from "next";
import ArticleList from "@/components/BizView/ArticleList";
import PageFooter from "@/components/BizView/PageFooter";
import PageHeader from "@/components/BizView/PageHeader";
import { useRouter } from "next/router";
import Head from "next/head";
interface SearchPageProps {
  defaultListData: PaginationResult<Article>;
}
const SearchPage: NextPage<SearchPageProps> = ({ defaultListData }) => {
  const router = useRouter();
  const { q = "" } = router.query;
  const [form] = Form.useForm();
  console.log("qqqq", q);
  return (
    <div className="page-container search-page">
      <Head>
        <title>{q ? `${q}-` : ""}搜索-王嘉炀·个人博客</title>
      </Head>
      <PageHeader></PageHeader>
      {/* <SearchBar /> */}
      <div className="search-bar">
        <Form
          form={form}
          className="search-form"
          onFinish={(values) => {
            const { title } = values;
            router.replace(`/search?q=${title}`);
          }}
        >
          <Form.Item name="title" initialValue={q} style={{ marginBottom: 0, width: "100%" }}>
            <Input
              bordered={false}
              size="large"
              allowClear
              maxLength={32}
              placeholder="请输入文章标题进行检索"
              suffix={
                <SearchOutlined
                  onClick={() => {
                    form.submit();
                  }}
                  style={{ color: "#888", cursor: "pointer" }}
                />
              }
            />
          </Form.Item>
        </Form>
      </div>

      <main className="main-constainer" style={{ maxWidth: 960 }}>
        <section className="main-content">
          {q ? (
            <ArticleList data={defaultListData} params={{ title: q }}></ArticleList>
          ) : (
            <Empty
              description={`请输入文章标题关键字进行检索`}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ marginTop: 100, marginBottom: 100 }}
            />
          )}
        </section>
      </main>
      <PageFooter />
    </div>
  );
};
export default SearchPage;

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  // console.log("query", context.query);
  const { q } = context.query;
  let defaultListData: PaginationResult<Article> = {
    list: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  };
  if (q) {
    const [articleResp] = await Promise.all([
      getArticleList({
        title: q,
        pageNum: 1,
        pageSize: 10,
      }),
    ]);
    defaultListData = articleResp.data;
  }

  return {
    props: {
      defaultListData,
    },
  };
};
