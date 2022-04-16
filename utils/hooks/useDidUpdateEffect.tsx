import { DependencyList, useEffect, useRef } from "react";

export function useDidUpdateEffect(fn: VoidFunction, deps?: DependencyList) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, deps);
}
