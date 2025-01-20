import { Send20Filled } from "@fluentui/react-icons";
import React from "react";

const SendIcon = ({ disabled, chatStyles, handleSendMessage }) => {
  return (
    <Send20Filled className={!disabled ? chatStyles.sendBtn : chatStyles.sendBtnDisabled} onClick={handleSendMessage} />
  );
};

export default SendIcon;
