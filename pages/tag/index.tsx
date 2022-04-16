import { useEffect, useState } from "react";
import { NextPage } from "next";
import PageFooter from "@/components/BizView/PageFooter";
import PageHeader from "@/components/BizView/PageHeader";
import styles from "./index.module.scss";
import { getTagList, Tag } from "@/servers/article";
import { PaginationResult } from "@/@types";
import { Empty, Form, Input, Skeleton, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import Head from "next/head";
const CateTag: NextPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState<PaginationResult<Tag>>({
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: 20,
  });

  useEffect(() => {
    queryTagList();
  }, []);
  function queryTagList(searchParam: Record<string, any> = {}) {
    setLoading(true);
    getTagList({ ...searchParam, pageSize: 64 })
      .then((res) => {
        if (res.code === 0) {
          setListData(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className={`page-container ${styles.cateTagPage}`}>
      <Head>
        <title>标签列表-王嘉炀·个人博客</title>
      </Head>
      <PageHeader></PageHeader>
      <div className="search-bar">
        <Form
          form={form}
          className="search-form"
          onFinish={(values) => {
            const { name } = values;
            queryTagList({ name });
          }}
        >
          <Form.Item name="name" style={{ marginBottom: 0, width: "100%" }}>
            <Input
              bordered={false}
              size="large"
              allowClear
              maxLength={32}
              placeholder="输入标签名进行检索"
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
      <main className="main-constainer">
        <section className="main-content">
          <div className="tag-show-container">
            <ul className="tag-list">
              {listData.list.map((tag) => (
                <li key={tag.id} className="item">
                  <div className="tag">
                    <div className="info-box">
                      <a>
                        <img className="thumb" alt={tag.name} src={tag.cover} />
                        <div className="title">{tag.name}</div>
                      </a>
                      <div className="meta-box">
                        {/* <div className="meta subscribe">555461 关注</div>{" "} */}
                        <div className="meta article">{tag.articleCount} 文章</div>
                      </div>
                    </div>
                    <div className="action-box">
                      <button
                        className="open-btn"
                        onClick={() => {
                          router.push(`/tag/${tag.name}`);
                        }}
                      >
                        <span>进入</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {!loading && listData.total === 0 && (
              <div style={{ padding: "30px 0" }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="未检索到数据" />
              </div>
            )}
            {loading && (
              <ul className="tag-list">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
                  <li key={v} className="item">
                    <div className="tag">
                      <Space direction="vertical">
                        <Skeleton.Avatar size="large" active></Skeleton.Avatar>
                        <Skeleton.Input size="small" active></Skeleton.Input>
                        <Skeleton.Input size="small" active></Skeleton.Input>
                        <Skeleton.Button active></Skeleton.Button>
                      </Space>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
};
export default CateTag;
