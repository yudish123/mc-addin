import React from "react";
import { useSearchParams } from "react-router-dom";

const Xpayinit = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const intent_id = searchParams.get("intent_id");

  if (url) window.location.href = url;
  else window.location.href = `https://pay.xpaycheckout.com/v3/?xpay_intent_id=${intent_id}`;

  return <></>;
};

export default Xpayinit;
