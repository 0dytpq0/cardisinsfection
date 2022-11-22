import React from "./react";
import { useInfo } from "../store";

export default function Printinfo() {
  const { carinfo } = useInfo((state) => state);

  return <></>;
}
