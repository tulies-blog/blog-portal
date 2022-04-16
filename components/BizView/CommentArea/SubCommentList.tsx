import { CommentReply } from "@/servers/comment";
import React from "react";
import CommentItem from "./CommentItem";
interface SubCommentListProps {
  list: CommentReply[];
  onPublish?: (values: CommentReply) => void;
}
const SubCommentList: React.FC<SubCommentListProps> = ({ onPublish, list }) => {
  return (
    <div className="subcomment-wrapper">
      <div className="subcomment-wrapper-box">
        <div className="sub-comment-list">
          {list.map((comment) => (
            <CommentItem key={comment.id} comment={comment} sub={true} onPublish={onPublish}></CommentItem>
          ))}
        </div>
        <div className="subcomment-fetch-more">
          <span className="subcomment-fetch-more-comment">
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
        </div>
      </div>
    </div>
  );
};
export default SubCommentList;
