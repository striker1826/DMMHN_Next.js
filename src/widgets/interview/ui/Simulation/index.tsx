"use client";

import { End, Ready, Start } from "@/components/interview";
import { useState } from "react";
import styles from "./index.module.scss";

export const Simulation = () => {
  const [status, setStatus] = useState<"ready" | "start" | "end">("ready");

  let content = <Ready onChangeStatus={setStatus} />;

  if (status === "start") {
    content = <Start onChangeStatus={setStatus} />;
  } else if (status === "end") {
    content = <End />;
  }

  return <div className={styles.layout}>{content}</div>;
};
