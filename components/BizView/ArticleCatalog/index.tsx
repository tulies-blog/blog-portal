import { TocItem } from "@/utils/mdutil";
import { Anchor } from "antd";
import React from "react";
import styles from "./index.module.scss";

interface ArticleCatalogProps {
  data: TocItem[];
}
const ArticleCatalog: React.FC<ArticleCatalogProps> = (props) => {
  const { data } = props;
  // const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);
  // useEffect(() => {
  //   setTargetOffset(window.innerHeight / 2);
  // }, []);
  // function renderCatalog(tocs: TocItem[]) {
  //   return (
  //     <ul className="catalog-list" style={{ marginTop: 0 }}>
  //       {tocs.map((toc: TocItem) => {
  //         return (
  //           <li key={toc.id} className={`item d${toc.level}`}>
  //             <div className="a-container">
  //               <a href={`#${toc.id}`} title={toc.text} className="catalog-aTag">
  //                 {toc.text}
  //               </a>
  //             </div>
  //             {toc.children && renderCatalog(toc.children)}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // }
  function renderCatalog(tocs: TocItem[]) {
    return (
      <>
        {tocs.map((toc: TocItem) => {
          return (
            <Anchor.Link key={toc.id} href={`#${toc.id}`} title={toc.text}>
              {toc.children && renderCatalog(toc.children)}
            </Anchor.Link>
          );
        })}
      </>
    );
  }
  return (
    <div className={`${styles.articleCatalogBlock} sidebar-block sticky`}>
      <nav className="article-catalog">
        <div className="catalog-title">目录</div>
        {/* <div className="catalog-body">{renderCatalog(data)}</div> */}
        <div className="catalog-body">
          <Anchor affix={false} showInkInFixed>
            {renderCatalog(data)}
          </Anchor>
        </div>
      </nav>
    </div>
  );
};

export default ArticleCatalog;
