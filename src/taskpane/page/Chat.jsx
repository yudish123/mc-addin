import React, { useState } from "react";
import { useChatstyles } from "../hooks/styles/chat/useChatstyles";
import { Input } from "@fluentui/react-components";
import MessageContainer from "../components/Chat/MessageContainer";
import { chatApi } from "../api";
import "../override.css";
import SendIcon from "../components/icons/SendIcon";
const Chat = () => {
  const chatStyles = useChatstyles();
  const [messages, setMessages] = useState([{ id: 1, text: "Hello! How can I help you today?", sender: "assistant" }]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setLoading(true);
    const response = await chatApi(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        text: response,
        sender: "assistant",
      },
    ]);
    setLoading(false);
    setUserInput("");
  };

  return (
    <div className={chatStyles.pageContainer}>
      <MessageContainer loading={loading} messages={messages} />
      <Input
        appearance="outline"
        disabled={loading}
        className={chatStyles.chatInput}
        placeholder="Type your message here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        contentAfter={<SendIcon disabled={loading} chatStyles={chatStyles} handleSendMessage={handleSendMessage} />}
      />
    </div>
  );
};

export default Chat;
