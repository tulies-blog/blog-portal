import wx from "weixin-js-sdk";
import { wxJsapiSignature } from "@/servers/wx";

// 用户注销
export function wxInit() {
  if (!navigator.userAgent.match(/micromessenger/i)) {
    // 如果不是在微信浏览器内，则直接返回空
    // if (options.callback) options.callback();
    return;
  }
  wxJsapiSignature({ url: location.href }).then((res) => {
    if (res.code === 0) {
      wx.config({
        debug: true,
        ...res.data,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
        ],
      });
    }
  });
}

export function updateAppMessageShareData(shareData: any) {
  shareData = shareData || {
    // title: '天翼超高清',
    // desc: '一个有理想的码农的个人博客，专注前沿技术的研究和学习，一直在快乐学习的路上。',
    // link: location.href,
    // imgUrl: 'http://stc.wangjiayang.cn/blog/logo.jpg',
    ...shareData,
  };
  wx.onMenuShareAppMessage({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
  });
  wx.onMenuShareTimeline({
    title: shareData.title,
    // desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
  });
  wx.onMenuShareQQ({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
  });
  wx.onMenuShareWeibo({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
  });
}
