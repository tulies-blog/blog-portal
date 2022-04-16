import { CommentReply, getReplyList } from "@/servers/comment";
import { message, Spin } from "antd";
import { uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

interface RootCommentItemProps {
  comment: CommentReply;
}
const RootCommentItem: React.FC<RootCommentItemProps> = ({ comment }) => {
  const [replyList, setReplyList] = useState<CommentReply[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
  }>({
    pageNum: 0,
    pageSize: 20,
  });
  useEffect(() => {
    setReplyList(comment.replyList || []);
    setTotal(comment.replyCount || 0);
  }, []);

  useEffect(() => {
    if (pagination.pageNum > 0) {
      queryReplyList();
    }
  }, [pagination]);
  function queryReplyList() {
    setLoading(true);
    getReplyList({ rootid: comment.id, ...pagination })
      .then((res) => {
        if (res.code === 0) {
          let list = [...replyList, ...res.data.list];
          // listDataRef.current = list;
          list = uniqBy(list, "id");
          setReplyList(list);
          setTotal(res.data.total);
        } else {
          message.error(res.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function onPublish(values: CommentReply) {
    setReplyList([...replyList, values]);
  }
  return (
    <div className="commentWrapper">
      <CommentItem comment={comment} onPublish={onPublish}></CommentItem>
      {replyList.length > 0 && (
        <div className="subcomment-wrapper">
          <div className="subcomment-wrapper-box">
            <div className="sub-comment-list">
              {replyList.map((reply) => (
                <CommentItem key={reply.id} comment={reply} sub={true} onPublish={onPublish}></CommentItem>
              ))}
            </div>
            {replyList.length < total && (
              <div className="subcomment-fetch-more">
                <Spin spinning={loading}>
                  <span
                    className="subcomment-fetch-more-comment"
                    onClick={() => {
                      setPagination({
                        ...pagination,
                        pageNum: pagination.pageNum + 1,
                      });
                    }}
                  >
                    查看更多回复
                    <svg
                      data-v-d6f79dbc=""
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=""
                    >
                      <path
                        data-v-d6f79dbc=""
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
                      ></path>
                    </svg>
                  </span>
                </Spin>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default RootCommentItem;
