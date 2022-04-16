import useWindowEvent from "@/utils/hooks/useWindowEvent";
import { TocItem } from "@/utils/mdutil";
import React, { useState } from "react";
import styles from "./index.module.scss";

interface ArticleCatalogProps {
  data: TocItem[];
}
const ArticleCatalog: React.FC<ArticleCatalogProps> = (props) => {
  const { data } = props;
  const [scrollTop, setScrollTop] = useState(0);
  // const [tocdata, setTocdata] = useState<TocItem[]>([]);
  // const winHieght = window.innerHeight || document.documentElement.clientHeight;
  // const scrollTop = document.documentElement.scrollTop;
  // useEffect(() => {
  //   // 计算一下目录数据
  //   console.log("计算一下目录数据", data);
  //   // setTimeout(() => {
  //   //   setTocdata(
  //   //     data.map((v) => ({
  //   //       ...v,
  //   //       rect: document.getElementById(v.id)?.getBoundingClientRect(),
  //   //     }))
  //   //   );
  //   // }, 5000);
  // }, data);

  // TODO 需要做防抖
  useWindowEvent({
    scroll: () => {
      console.log("触发一下滚动");
      // setTocdata(calcTocData(tocdata));
      setScrollTop(document.documentElement.scrollTop);
    },
  });
  // function calcTocData(tocdata: TocItem[]) {
  //   // const winWidth = window.innerWidth || document.documentElement.clientWidth;
  //   const winHieght = window.innerHeight || document.documentElement.clientHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   console.log(winHieght, scrollTop);
  //   return tocdata.map((toc) => {
  //     console.log(toc.id, toc.text, toc.rect?.top, winHieght + scrollTop);
  //     if (toc.rect && toc.rect.top < winHieght + scrollTop) {
  //       return { ...toc, active: true };
  //     }
  //     return { ...toc, active: false };
  //   });
  // }

  function renderCatalog(tocs: TocItem[]) {
    return (
      <ul className="catalog-list" style={{ marginTop: 0 }}>
        {tocs.map((toc: TocItem) => {
          let active = false;

          if (typeof window !== "undefined") {
            const winHieght = window.innerHeight || document.documentElement.clientHeight;
            // const scrollTop = document.documentElement.scrollTop;
            const rect = document.getElementById(toc.id)?.getBoundingClientRect();
            console.log("触发这个渲染了吗", toc.text, rect, winHieght + scrollTop);
            if (rect && rect?.top < winHieght + scrollTop) {
              active = true;
            }
          }
          return (
            <li key={toc.id} className={`item d${toc.level} ${active ? "active" : ""}`}>
              <div className="a-container">
                <a href={`#${toc.id}`} title={toc.text} className="catalog-aTag">
                  {toc.text}
                </a>
              </div>
              {toc.children && renderCatalog(toc.children)}
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className={`${styles.articleCatalogBlock} sidebar-block sticky`}>
      <nav className="article-catalog">
        <div className="catalog-title">目录</div>
        <div className="catalog-body">{renderCatalog(data)}</div>
      </nav>
    </div>
  );
};

export default ArticleCatalog;
