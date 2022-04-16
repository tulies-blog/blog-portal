/*
 * @Author: 王嘉炀
 * @Date: 2020-03-29 21:52:10
 */

const trim = function (str: string) {
  return (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};
export function hasClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

export function addClass(el: HTMLElement, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += " " + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(" " + clsName + " ", " ");
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/** 判断是否在课件区域 */
export function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom > 0) ||
    (rect.top > 0 &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= 0 &&
      rect.right > 0) ||
    (rect.left > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth))
  );
}
