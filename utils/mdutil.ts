import { marked } from "marked";

export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
  parent?: TocItem;
  rect?: DOMRect;
  active?: boolean;
}
function createToc(toclist: TocItem[]): TocItem[] {
  let tocNodes: TocItem[] = [];
  toclist.forEach((toc, index) => {
    if (index > 0) {
      checktoc(toc, toclist[index - 1], tocNodes);
    } else {
      tocNodes.push(toc);
    }
  });
  tocNodes = resettoc(tocNodes);
  return tocNodes;
}

function checktoc(toc: TocItem, prev: TocItem, tocNodes: TocItem[]) {
  if (toc.level === prev.level) {
    if (!prev.parent) {
      tocNodes.push(toc);
      return;
    }
    prev.parent.children?.push(toc);
  } else if (toc.level < prev.level) {
    if (!prev.parent) {
      tocNodes.push(toc);
      return;
    }
    // 如果当前标题的级别比父层大 则继续往上找。
    checktoc(toc, prev.parent as TocItem, tocNodes);
  } else {
    // 否则加到下面
    if (!prev.children) {
      prev.children = [];
    }
    toc.parent = prev;
    prev.children?.push(toc);
  }
}
// 更新level，以及去掉parent，防止转化json造成死循环
function resettoc(tocs: TocItem[]) {
  const newtocs = tocs.map((v) => {
    if (v.parent) {
      v.level = v.parent.level + 1;
    } else {
      v.level = 1;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parent, ...restV } = v;
    if (restV.children) {
      restV.children = resettoc(restV.children);
    }
    return { ...restV };
  });
  return newtocs;
}
export function markedContent(content: string) {
  if (!content) {
    return {
      toc: [],
      html: "",
    };
  }
  const toclist: TocItem[] = [];
  const renderer = new marked.Renderer();
  let num = 0;
  renderer.heading = function (text: string, level: number) {
    // const escapedText = text.replace(/[^(\u4E00-\u9FA5A-Z0-9a-z)]+/g, "-");
    const escapedText = "heading-" + num;
    toclist.push({ id: escapedText, text, level });
    num++;
    return `<h${level} id="${escapedText}" title="${text}">
                       ${text}
                     </h${level}>`;
  };
  marked.setOptions({ breaks: true, renderer });
  // return marked(content);
  const html = marked(content);
  const toc = createToc(toclist);

  return {
    toc,
    html,
  };
}
