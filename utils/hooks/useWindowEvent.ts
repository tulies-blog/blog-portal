import { useEffect } from "react";
// import { ipcRenderer } from 'electron'
const useWindowEvent = (keyCallbackMap: any) => {
  useEffect(() => {
    Object.keys(keyCallbackMap).forEach((key) => {
      window.addEventListener(key, keyCallbackMap[key]);
    });
    return () => {
      Object.keys(keyCallbackMap).forEach((key) => {
        window.removeEventListener(key, keyCallbackMap[key]);
      });
    };
  });
};

export default useWindowEvent;
