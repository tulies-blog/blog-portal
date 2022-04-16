import Image from "next/image";
import upyunLogo from "../../../assets/imgs/upyun_logo.png";
import styles from "./footer.module.scss";
const PageFooter = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className="footer-content">
        <div className="footer-copyright-left">
          <p>Copyright©2022 王嘉炀·个人博客 wangjiayang.cn</p>
          <p>
            <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">沪ICP备18041792号</a>
          </p>
        </div>
        <div className="footer-copyright-right">
          <div>
            <a
              className="upyun"
              href="https://www.upyun.com/"
              title="又拍云"
              target="_blank"
              style={{ lineHeight: "35px" }}
              rel="noreferrer"
            >
              <Image
                src={upyunLogo}
                height="35px"
                width={80}
                // style={{ verticalAlign: "middle" }}
                alt=""
              />
              <span style={{ display: "inline-block", paddingTop: 2 }}>提供cdn支持</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
