import wx from "@tulies/weixin-js-sdk";
import { wxJsapiSignature } from "@/servers/wx";

interface ShareDataProps {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
}

// 用户注销
export function wxInit() {
  if (!navigator.userAgent.match(/micromessenger/i)) {
    // 如果不是在微信浏览器内，则直接返回空
    // if (options.callback) options.callback();
    return;
  }
  wxJsapiSignature({ url: location.href.split("#")[0] }).then((res) => {
    console.log(res);
    if (res.code === 0) {
      wx.config({
        debug: false,
        ...res.data,
        jsApiList: [
          "updateAppMessageShareData",
          "updateTimelineShareData",
          // "onMenuShareTimeline",
          // "onMenuShareAppMessage",
          // "onMenuShareQQ",
          // "onMenuShareWeibo",
          // "onMenuShareQZone",
        ],
      });
    }
  });
}
export function wxReadly(fn: VoidFunction, flag = true) {
  if (flag) {
    wx.ready(() => {
      fn();
    });
  } else {
    fn();
  }
}
export function setShareData(props: Partial<ShareDataProps>) {
  const defaultData: ShareDataProps = {
    title: "王嘉炀·个人博客",
    desc: "希望能有一天能把写代码变成纯粹的兴趣，不在为生活而去写代码。",
    link: location.href,
    imgUrl: "http://www.wangjiayang.cn/logo.jpg",
  };
  // TODO 这地方的ts类型写的有问题
  Object.keys(props).forEach((key) => {
    const k = key as keyof ShareDataProps;
    if (props[k]) {
      defaultData[k] = props[k] as string;
    }
  });

  const shareData = defaultData;
  wx.updateAppMessageShareData({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
  });
  wx.updateTimelineShareData({
    title: shareData.title,
    // desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
  });
  // wx.onMenuShareAppMessage({
  //   title: shareData.title,
  //   desc: shareData.desc,
  //   link: shareData.link,
  //   imgUrl: shareData.imgUrl,
  // });
  // wx.onMenuShareTimeline({
  //   title: shareData.title,
  //   // desc: shareData.desc,
  //   link: shareData.link,
  //   imgUrl: shareData.imgUrl,
  // });
  // wx.onMenuShareQQ({
  //   title: shareData.title,
  //   desc: shareData.desc,
  //   link: shareData.link,
  //   imgUrl: shareData.imgUrl,
  // });
  // wx.onMenuShareWeibo({
  //   title: shareData.title,
  //   desc: shareData.desc,
  //   link: shareData.link,
  //   imgUrl: shareData.imgUrl,
  // });
}
