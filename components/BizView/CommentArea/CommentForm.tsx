import {
  useEffect,
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  // MutableRefObject,
} from "react";
import { Button, Col, Form, Input, Row } from "antd";
import styles from "./index.module.scss";
import { ruleEmail, ruleWebsite } from "@/utils/rule";
const usernameLayout = { xs: 24, sm: 12, md: 6 };
const websiteLayout = { xs: 24, sm: 24, md: 12 };
export interface CommentFormRefProps {
  setLoading: (flag: boolean) => void;
  submit: () => void;
  resetFields: () => void;
}
interface CommentFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit,onBlur"> {
  // commentForm: MutableRefObject<CommentFormRefProps>;
  autoFocus?: boolean;
  // onSubmit?: (values: any) => Promise<any>;
  onSubmit?: (values: any) => void;
  onBlur?: (values: any) => void;
}
const CommentForm: ForwardRefRenderFunction<CommentFormRefProps, CommentFormProps> = (
  { onSubmit, onBlur, autoFocus = false, ...restProps },
  ref
) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    onBlur && document.documentElement.addEventListener("click", handleClick);
    return () => {
      onBlur && document.documentElement.removeEventListener("click", handleClick);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    setLoading: (flag: boolean) => {
      setLoading(flag);
    },
    submit: () => {
      return form.submit();
    },
    resetFields: () => {
      return form.resetFields();
    },
  }));
  function handleClick(e: any) {
    console.log("click", e);
    if (!form.getFieldValue("content")) {
      onBlur && onBlur(form.getFieldsValue());
    }
  }
  return (
    <div
      tabIndex={1}
      className={`${styles.commentForm}`}
      {...restProps}
      onClick={(e) => {
        e.stopPropagation(); //阻止冒泡
      }}
    >
      <Form
        form={form}
        // validateTrigger="onSubmit"
        onFinish={(values) => {
          if (onSubmit) {
            // setLoading(true);
            onSubmit(values);
            // .then((res) => console.log(res))
            // .finally(() => {
            //   setLoading(false);
            // });
          }
        }}
        onKeyDown={(e) => {
          console.log(e);
          if ((e.ctrlKey || e.metaKey) && e.code.toLowerCase() === "enter") {
            form.submit();
          }
        }}
      >
        <Form.Item name="content" rules={[{ required: true, message: "请输入评论的内容!" }]}>
          <Input.TextArea
            autoFocus={autoFocus}
            autoSize={{ minRows: 2 }}
            placeholder="输入评论（Enter换行，⌘ + Enter发送）"
          />
        </Form.Item>
        <Row gutter={8}>
          <Col {...usernameLayout}>
            <Form.Item name="username" rules={[{ required: true, message: "请输入昵称/姓名!" }]}>
              <Input placeholder="昵称/姓名（必须）" />
            </Form.Item>
          </Col>
          <Col {...usernameLayout}>
            <Form.Item
              name="email"
              rules={[
                {
                  pattern: ruleEmail,
                  message: "邮箱不正确",
                },
              ]}
            >
              <Input placeholder="邮箱（可选）" />
            </Form.Item>
          </Col>

          <Col {...websiteLayout}>
            <Form.Item
              name="website"
              rules={[
                {
                  pattern: ruleWebsite,
                  message: "网址不合法",
                },
              ]}
            >
              <Input placeholder="个人主页（可选）" />
            </Form.Item>
          </Col>
        </Row>
        <div className="form-action-box">
          {/* <div className="emoji-container emoji-btn">
            <div className="emoji-box">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00002 0.666504C12.0501 0.666504 15.3334 3.94975 15.3334 7.99984C15.3334 12.0499 12.0501 15.3332 8.00002 15.3332C3.94993 15.3332 0.666687 12.0499 0.666687 7.99984C0.666687 3.94975 3.94993 0.666504 8.00002 0.666504ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM10.6667 5.66667V7.66667H9.33333V5.66667H10.6667ZM6.66667 5.66667V7.66667H5.33333V5.66667H6.66667ZM10.0767 9.33333H11.0495C11.1804 9.33333 11.2866 9.43951 11.2866 9.57048C11.2866 9.60754 11.2779 9.64409 11.2612 9.67718L11.244 9.71053C10.6294 10.8739 9.40726 11.6667 7.99998 11.6667C6.61523 11.6667 5.40977 10.8991 4.7859 9.76612L4.73786 9.67593C4.67845 9.56052 4.72385 9.4188 4.83926 9.35939C4.87253 9.34226 4.90941 9.33333 4.94683 9.33333H5.92347C6.02396 9.33332 6.11908 9.37865 6.18238 9.4567C6.26207 9.55496 6.32833 9.62955 6.38117 9.68046C6.80074 10.0847 7.37133 10.3333 7.99998 10.3333C8.63289 10.3333 9.20694 10.0814 9.62728 9.67224C9.67791 9.62296 9.74135 9.55121 9.8176 9.45698C9.88089 9.37877 9.97611 9.33333 10.0767 9.33333Z"
                ></path>
              </svg>
              <span>表情</span>
            </div>
          </div> */}
          {/* <div className="image-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z"
              ></path>
            </svg>
            <span>图片</span>
          </div> */}
          <div className="tips">文明评论，理性发言</div>
          <div className="submit">
            <span>⌘ + Enter</span>
            <Button htmlType="submit" className="submit-btn" type="primary" loading={loading}>
              发布
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default forwardRef(CommentForm);
