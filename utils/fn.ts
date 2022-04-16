import moment from "moment";

export function getDateDiff(datetime: string) {
  const target = moment(datetime, "YYYY-MM-DD HH:mm:ss");
  return target.fromNow().replace(" ", "");
}

/**
 * 获取URL参数
 * @param name
 * @param defaultvalue
 * @returns
 */
export function getQueryString(name: string, defaultvalue?: string, pageUrl?: string) {
  const vars: { [key: string]: string | null | undefined } = {};
  const pageHref = pageUrl || window.location.href;
  pageHref.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    if (value && value.split("#").length > 0) {
      vars[key] = decodeURIComponent(value.split("#")[0]);
    } else {
      vars[key] = decodeURIComponent(value);
    }
    return value;
  });
  return vars[name] || defaultvalue || null;
}

interface Key2valueParam<T = any> {
  fieldNames?: {
    id?: keyof T;
    name?: keyof T;
  };
  returnType?: "value" | "obj";
}
/**
 * 从数组数据中获取指定的对象数据
 * @param params
 * @returns
 */
export function key2value<T = any>(data: T[], input: any, params: Key2valueParam<T> = {}) {
  // console.log(data, input)
  const { fieldNames, returnType = "value" } = params;
  let id = "id" as keyof T;
  let name = "name" as keyof T;
  if (fieldNames) {
    name = fieldNames.name || name;
    id = fieldNames.id || id;
  }
  let result = null;
  for (const d of data) {
    // console.log(data[k])
    // const d: T = data[k]
    if (d[id] === input) {
      result = returnType === "value" ? d[name] : d;
      break;
    }
  }
  return result;
}
