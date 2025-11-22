// hooks/useContainerWidth.ts
"use client";

import { useState, useEffect, useRef } from "react";

export const useContainerWidth = (breakpoint: number = 768) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setColumns(width >= breakpoint ? 3 : 1);
      }
    };

    checkWidth();

    const resizeObserver = new ResizeObserver(checkWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [breakpoint]);

  return { containerRef, columns };
};
