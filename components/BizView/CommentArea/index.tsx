import RootCommentItem from "./RootCommentItem";
import styles from "./index.module.scss";
import CommentForm, { CommentFormRefProps } from "./CommentForm";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { commentPublish, CommentReply, getCommentList, initCommentTopic } from "@/servers/comment";
import { Empty, message, Spin } from "antd";
import { uniqBy } from "lodash";
interface CommentAreaParops {
  /** 评论的主题ID */
  tid: string;
  title: string;
  /** 类型，作为扩展标识用吧 */
  type: string;
  /** 评论来源URL */
  url?: string;
}
const CommentArea: React.FC<CommentAreaParops> = ({ tid, title, type, url }) => {
  // const listDataRef = useRef<CommentReply[]>([]);
  const commentForm = useRef() as MutableRefObject<CommentFormRefProps>;
  const [listData, setListData] = useState<CommentReply[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
  }>({
    pageNum: 1,
    pageSize: 20,
  });
  useEffect(() => {
    // 初始化下，如果存在主题就直接返回主题信息，如果不存在则会新建
    initCommentTopic({ tid, title, type, url });
    // .then((res) => {
    //   console.log("评论主题信息", res);
    // });
  }, []);
  useEffect(() => {
    queryCommentList();
  }, [pagination]);
  function queryCommentList() {
    setLoading(true);
    getCommentList({ tid, ...pagination })
      .then((res) => {
        console.log("这是listData", listData);
        console.log(res);
        if (res.code === 0) {
          let list = [...listData, ...res.data.list];
          // listDataRef.current = list;
          list = uniqBy(list, "id");
          setListData(list);
          setTotal(res.data.total);
        } else {
          message.error(res.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleCommentPublish(values: any) {
    // const hideloading = message.loading("正在发表评论");
    commentForm.current.setLoading(true);
    commentPublish({ ...values, tid })
      .then((res) => {
        console.log("发表评论", res);
        if (res.code === 0) {
          setListData([res.data, ...listData]);
          setTotal(total + 1);
          commentForm.current.resetFields();
          message.success("发表成功");
        } else {
          message.error(res.message);
        }
      })
      .finally(() => {
        commentForm.current.setLoading(false);
      });
  }
  return (
    <div className={styles.commentArea}>
      <div className={styles.commentFormWrapper}>
        <div className="header">
          <span className="header-title">评论</span>
        </div>
        <div className="comment-box">
          <CommentForm ref={commentForm} onSubmit={handleCommentPublish}></CommentForm>
        </div>
      </div>
      <div className={styles.commentListWrapper}>
        <div className="title">全部评论</div>

        <div className="comment-list">
          {/* 有评论数据 */}
          {listData.length > 0 &&
            listData.map((comment) => <RootCommentItem key={comment.id} comment={comment}></RootCommentItem>)}

          {/* 无评论数据 */}
          {!loading && total === 0 && (
            <div style={{ paddingBottom: 10 }}>
              <Empty description="暂无评论数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}

          {/* 首次加载loding中 */}
          {loading && total === 0 && (
            <Spin spinning={true}>
              <div style={{ height: 50 }}></div>
            </Spin>
          )}
        </div>

        {listData.length < total && (
          <Spin spinning={loading}>
            <div className="fetch-more">
              <p
                className="fetch-more-comment"
                onClick={() => {
                  setPagination({
                    ...pagination,
                    pageNum: pagination.pageNum + 1,
                  });
                }}
              >
                查看{total - listData.length > pagination.pageSize ? "更多" : `全部 ${total} 条`}回复
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
    </div>
  );
};
export default CommentArea;
