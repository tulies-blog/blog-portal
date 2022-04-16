import IconFont from "@/components/IconFont";
import AvatarPlus from "@/components/UiPlus/AvatarPlus";
import { commentDigg, CommentReply, replyPublish } from "@/servers/comment";
import { getDateDiff } from "@/utils/fn";
import { useDidUpdateEffect } from "@/utils/hooks/useDidUpdateEffect";
import { useThrottleFn } from "ahooks";
import { message } from "antd";
import Link from "next/link";
import React, { MutableRefObject, useRef, useState } from "react";
import CommentForm, { CommentFormRefProps } from "./CommentForm";

interface CommentItemProps {
  comment: CommentReply;
  sub?: boolean;
  onPublish?: (values: CommentReply) => void;
}
const CommentItem: React.FC<CommentItemProps> = ({ comment, onPublish, sub = false }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const commentForm = useRef() as MutableRefObject<CommentFormRefProps>;
  const [record, setRecord] = useState(comment);

  useDidUpdateEffect(() => {
    setRecord(comment);
  }, [comment]);
  // 走防抖
  const { run: handleDiggRun, cancel: handleDiggCancel } = useThrottleFn(
    () => {
      commentDigg(record.id, record.isDigg ? 0 : 1).finally(() => {
        handleDiggCancel();
      });
      // 直接执行，速度快点
      setRecord({
        ...record,
        diggCount: record.isDigg ? record.diggCount - 1 : record.diggCount + 1,
        isDigg: record.isDigg ? 0 : 1,
      });
    },
    {
      wait: 2000,
    }
  );

  function handleDigg(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    handleDiggRun();
  }
  function handleReplyPublish(values: any) {
    commentForm.current.setLoading(true);
    replyPublish({ ...values, parentid: comment.id })
      .then((res) => {
        console.log("发布评论", res);
        if (res.code === 0) {
          // setListData([res.data, ...listData]);
          setShowCommentForm(false);
          message.success("发布成功");
          onPublish && onPublish(res.data);
        } else {
          message.error(res.message);
        }
      })
      .finally(() => {
        commentForm.current && commentForm.current.setLoading(false);
      });
  }

  return (
    <div className="comment">
      <div className="user-avatar">
        {comment.website ? (
          <Link href={comment.website}>
            <a target="_blank">
              <AvatarPlus size={sub ? 24 : 40} username={comment.username}></AvatarPlus>
            </a>
          </Link>
        ) : (
          <AvatarPlus size={sub ? 24 : 40} username={comment.username}></AvatarPlus>
        )}
      </div>
      <div className="content-box">
        <div className="comment-main">
          {/* <span className="delete">删除</span> */}
          <div className="user-box">
            <div className="username">
              <span className="name">
                {comment.website ? (
                  <Link href={comment.website}>
                    <a target="_blank">{comment.username}</a>
                  </Link>
                ) : (
                  comment.username
                )}
              </span>
            </div>
            {comment.grade >= 2 && (
              <div className="rely-box">
                <span>回复</span>
                <div className="username">
                  <span className="name">{comment.parent?.username}</span>
                </div>
              </div>
            )}
            <time className="time">{getDateDiff(comment.createTime)}</time>
          </div>
          <div className="content">{comment.content}</div>
          <div className="limit-btn">展开</div>
          {comment.grade >= 2 && (
            <div className="parent-wrapper">
              <div>“</div>
              <div className="parent-content">{comment.parent?.content}</div>
              <div>”</div>
            </div>
          )}
          <div className="action-box">
            <div className={`item dig-item ${record.isDigg && "active"}`} onClick={handleDigg}>
              {<IconFont type={record.isDigg ? `icon-dianzan_kuai` : `icon-dianzan`}></IconFont>}
              {record.diggCount > 0 ? record.diggCount : "点赞"}
            </div>
            <div
              className={`item ${showCommentForm && "active"}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentForm(!showCommentForm);
              }}
            >
              {showCommentForm ? (
                <>
                  <IconFont type={`icon-comment-filling`}></IconFont>
                  取消回复
                </>
              ) : (
                <>
                  <IconFont type={`icon-comment`}></IconFont>
                  回复
                </>
              )}
            </div>
          </div>
          {showCommentForm && (
            <CommentForm
              ref={commentForm}
              autoFocus={true}
              onBlur={({ content }) => {
                // console.log("values", content);
                setShowCommentForm(!!content);
              }}
              onSubmit={handleReplyPublish}
            ></CommentForm>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
