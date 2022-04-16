import { PaginationResult, SearchParams } from "@/@types";
import { Article, getArticleList } from "@/servers/article";
import React, { useEffect } from "react";
import ArticleItem from "./ArticleItem";
import styles from "./index.module.scss";
import { Empty, Skeleton, Spin } from "antd";
import { useRef, useState } from "react";
// import { useDidUpdateEffect } from "@/utils/hooks/useDidUpdateEffect";

// 这主要是为来赋予默认值
interface ArticleListProps {
  data: PaginationResult<Article>;
  params?: SearchParams;
}
const ArticleList: React.FC<ArticleListProps> = ({ data, params }) => {
  const [articleList, setArticleList] = useState<Article[]>(data.list);
  const searchParams = useRef<SearchParams>({
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    ...params,
  });
  const [pagination, setPagination] = useState<Omit<PaginationResult, "list">>(data);
  const [loading, setLoading] = useState(false);

  // 首次不渲染
  useEffect(() => {
    // console.log("hahaha", params);
    setSearchParams(
      {
        pageNum: data.pageNum,
        pageSize: data.pageSize,
        ...(params || {}),
      },
      true
    );
    setArticleList([]);
    setPagination({ ...data, total: 0 });

    // setArticleList([...data.list]);
    // setPagination(data);
    console.log(searchParams.current);
    queryListData();
  }, [data, params]);

  function setSearchParams(values: SearchParams, init = false) {
    if (init) {
      searchParams.current = {
        ...values,
      };
      return;
    }
    searchParams.current = {
      ...searchParams.current,
      ...values,
    };
  }
  function queryListData() {
    setLoading(true);
    getArticleList({
      ...searchParams.current,
    })
      .then((res) => {
        if (res.code === 0) {
          setPagination(res.data);
          if (res.data.pageNum === 1) {
            setArticleList([...res.data.list]);
          } else {
            setArticleList([...articleList, ...res.data.list]);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.articleList}>
      {/* 有数据 */}
      {articleList.length > 0 && (
        <div className="article-list-wrapper">
          {articleList.map((v) => (
            <ArticleItem key={v.id} data={v} />
          ))}
        </div>
      )}

      {/* 无数据 */}
      {!loading && pagination.total === 0 && (
        <div style={{ overflow: "hidden" }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 100, marginBottom: 100 }} />
        </div>
      )}
      {/* 首次加载loding中 */}
      {loading && articleList.length === 0 && (
        <div style={{ padding: "10px 18px 20px 18px " }}>
          <Skeleton active />
        </div>
      )}
      {/* <Spin spinning={true}>
          <div style={{ height: 50 }}></div>
        </Spin> */}
      {articleList.length < pagination.total && (
        <Spin spinning={loading}>
          <div className="article-fetch-more">
            <p
              className="article-fetch-more-comment"
              onClick={() => {
                setSearchParams({
                  pageNum: pagination.pageNum + 1,
                });
                queryListData();
              }}
            >
              查看更多
              <svg
                data-v-6032d624=""
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <path
                  data-v-6032d624=""
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
                ></path>
              </svg>
            </p>
          </div>
        </Spin>
      )}
    </div>
  );
};
export default ArticleList;
