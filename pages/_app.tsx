import Head from "next/head";
import type { AppProps } from "next/app";
import "../assets/styles/bootstrap.scss";
// import "antd/dist/antd.css";
import { BackTop, ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { useEffect } from "react";
// import wx from "@tulies/weixin-js-sdk";
import { setShareData, wxInit, wxReadly } from "@/utils/wx";
import Script from "next/script";
// import Script from "next/script";
moment.locale("zh-cn");

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    const isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE || isIE11) {
      const str =
        "你的浏览器版本太低了,已经和时代脱轨了 :(\n可能会导致您的页面无法访问\n推荐使用:谷歌,火狐等其他浏览器";
      alert(str);
    }
    // if (!sessionStorage.getItem("notification")) {
    //   notification.info({
    //     message: `提示`,
    //     description: "本站目前正在开发中，功能并未完善，若有问题，请见谅！若有建议，可在留言区给我留言，谢谢！",
    //     placement: "bottom",
    //     duration: null,
    //   });
    //   sessionStorage.setItem("notification", "1");
    // }

    // 注册微信JS-SDK配置
    wxInit();
    wxReadly(() => {
      setShareData({
        title: "王嘉炀·个人博客",
        desc: "希望能有一天能把写代码变成纯粹的兴趣，不在为生活而去写代码。",
        link: location.href,
      });
    });
    // wx.ready(() => {
    //   console.log("233-----------");
    //   setShareData({
    //     title: "王嘉炀·个人博客",
    //     desc: "希望能有一天能把写代码变成纯粹的兴趣，不在为生活而去写代码。",
    //     link: location.href,
    //   });
    // });
  }, []);
  return (
    <>
      <Head>
        <title>王嘉炀·个人博客</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        <meta name="description" content="王嘉炀，希望能有一天能把写代码变成纯粹的兴趣，不在为生活而去写代码。" />
        <meta
          name="keywords"
          content="个人博客,王嘉炀个人博客,博客,王嘉炀,个人网站,程序猿,IT,技术,日记,生活,学习,前端开发工程师,Java"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://hm.baidu.com/hm.js?4ad4bbdc6358179dcaa8730e908d407a"></Script>

      <ConfigProvider locale={zhCN}>
        <Component {...pageProps} />
        <BackTop />
      </ConfigProvider>
    </>
  );
}

export default MyApp;
