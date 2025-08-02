"use client";
import { ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  children: ReactNode;
}

export default function AOSProvider({ children }: Props) {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return <>{children}</>;
}
