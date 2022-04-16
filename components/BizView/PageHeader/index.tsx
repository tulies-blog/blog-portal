import { useRef, useState } from "react";
import useWindowEvent from "../../../utils/hooks/useWindowEvent";
import { addClass, removeClass } from "../../../utils/dom";
import Link from "next/link";
import { useRouter } from "next/router";
import { key2value } from "@/utils/fn";
// function isBrowser() {
//   return !!(
//     typeof window !== "undefined" &&
//     window.document &&
//     window.document.createElement
//   );
// }
const routers = [
  {
    name: "首页",
    path: "/",
  },
  {
    name: "分类标签",
    path: "/tag",
  },
  {
    name: "归档",
    path: "/timeline",
  },
  {
    name: "留言",
    path: "/comment",
  },
  {
    name: "关于",
    path: "/about",
  },
];

const PageHeader = () => {
  const scrollRef = useRef(0);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [phoneShowMenu, setPhoneShowMenu] = useState(false);
  function matchActivePath(pathname: string) {
    if (pathname === "/") {
      return pathname === router.pathname || router.pathname.startsWith("/cate/");
    } else {
      return pathname === router.pathname;
    }
  }
  // useEffect(() => {
  //   console.log("主动计算了吗");
  //   scrollRef.current = 0;
  //   calcuHeaderCLass();
  // }, [router.pathname]);
  // 做防抖
  useWindowEvent({
    scroll: () => {
      calcuHeaderCLass();
    },
  });
  function calcuHeaderCLass() {
    // console.log("主动计算了吗");
    const scrollTop = document.documentElement.scrollTop;
    if (scrollRef.current - scrollTop >= 0) {
      removeClass(document.body, "hideHeader");
    } else if (scrollRef.current - scrollTop < 0 && scrollTop > 70) {
      addClass(document.body, "hideHeader");
    }
    scrollRef.current = document.documentElement.scrollTop;
  }
  return (
    <div className="main-header-container">
      <div className="main-header-fixed">
        <div className="main-header">
          <div className="header-brand">
            <Link href={"/"}>
              <a>王嘉炀·个人博客</a>
            </Link>
          </div>
          <nav className="main-nav">
            <div className="nav-list">
              <div
                className={`phone-show-menu ${phoneShowMenu ? "active" : ""}`}
                onClick={() => {
                  console.log("hahah ");
                  setPhoneShowMenu(!phoneShowMenu);
                }}
              >
                <span>{key2value(routers, router.pathname, { fieldNames: { id: "path" } }) || "首页"}</span>
              </div>
              <ul className={`phone-hide ${phoneShowMenu ? "show" : ""}`}>
                {routers.map((r) => (
                  <li key={r.name} className={`nav-item${matchActivePath(r.path) ? " active" : ""}`}>
                    <Link href={r.path}>
                      <a
                        onClick={() => {
                          setTimeout(() => {
                            setPhoneShowMenu(!phoneShowMenu);
                          }, 200);
                        }}
                      >
                        {r.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="right-side-nav">
            <div className="nav-item search">
              <div className="search-form">
                <input
                  type="search"
                  maxLength={32}
                  placeholder="检索文章"
                  className="search-input"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value || "");
                  }}
                  onKeyDown={(e) => {
                    if (e.code.toLowerCase() === "enter") {
                      setSearch("");
                      router.replace(`/search?q=${search}`);
                    }
                  }}
                />
                <img
                  src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6401156ae5d55b2253b3d2351231f02c.svg"
                  alt="搜索"
                  className="search-icon"
                  onClick={() => {
                    setSearch("");
                    router.replace(`/search?q=${search}`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
