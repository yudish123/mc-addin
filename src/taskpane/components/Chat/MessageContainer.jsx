// MessageContainer.js
import React, { useRef, useEffect, useState } from "react";
import { useMessageStyles } from "../../hooks/styles/chat/useMessagestyles";
import { Checkmark16Filled, Copy16Filled } from "@fluentui/react-icons";
import { createMotionComponent } from "@fluentui/react-components";

const MessageContainer = ({ messages, loading }) => {
  const messageStyles = useMessageStyles();
  const messagesEndRef = useRef(null);

  const DropInOne = createMotionComponent({
    keyframes: [
      { transform: "translateY(-100%)", opacity: 0 },
      { transform: "translateY(0%)", opacity: 1 },
      { transform: "translateY(-50%)", opacity: 0.5 },
      { transform: "translateY(0%)", opacity: 1 },
    ],
    duration: 800,
    delay: 0,
    iterations: Infinity,
  });

  const DropInTwo = createMotionComponent({
    keyframes: [
      { transform: "translateY(-100%)", opacity: 0 },
      { transform: "translateY(0%)", opacity: 1 },
      { transform: "translateY(-50%)", opacity: 0.5 },
      { transform: "translateY(0%)", opacity: 1 },
    ],
    duration: 800,
    delay: 200,
    iterations: Infinity,
  });

  const DropInThree = createMotionComponent({
    keyframes: [
      { transform: "translateY(-100%)", opacity: 0 },
      { transform: "translateY(0%)", opacity: 1 },
      { transform: "translateY(-50%)", opacity: 0.5 },
      { transform: "translateY(0%)", opacity: 1 },
    ],
    duration: 800,
    delay: 400,
    iterations: Infinity,
  });

  const [copiedIndex, setCopiedIndex] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleCopy = (text, index, formulaIndex) => {
    console.log(index);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedIndex((prev) => [...prev, { msgInd: index, formulaInd: formulaIndex }]);
        setTimeout(
          () =>
            setCopiedIndex((prev) => [
              ...prev.filter((indObj) => indObj.msgInd !== index && indObj.formulaInd !== formulaIndex),
            ]),
          5000
        );
      })
      .catch((error) => {
        console.error("Copy failed", error);
      });
  };

  const renderMessageContent = (text, index) => {
    const pattern = /\/\/\/(.*?)\/\/\//g;
    const parts = [];
    let lastIndex = 0;
    let formulaIndex = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
      }

      const formulaText = match[1];
      const currInd = formulaIndex;
      parts.push(
        <div key={match.index} className={messageStyles.formulaDiv}>
          <span>{formulaText}</span>

          {copiedIndex.find((indObj) => indObj.formulaInd === currInd + 1 && indObj.msgInd === index) ? (
            <Checkmark16Filled className={messageStyles.checkIcon} title="Copied!" />
          ) : (
            <Copy16Filled
              className={messageStyles.copyIcon}
              onClick={() => handleCopy(formulaText, index, currInd + 1)}
              title="Copy to clipboard"
            />
          )}
        </div>
      );

      lastIndex = pattern.lastIndex;
      formulaIndex++;
    }

    // Push remaining text after the last formula match
    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return <>{parts}</>;
  };

  return (
    <div className={messageStyles.messagesContainer}>
      {messages.length > 0 ? (
        messages.map((msg, ind) => (
          <div
            key={msg.id}
            className={
              msg.sender === "assistant"
                ? `${messageStyles.message} ${messageStyles.assistantMessage}`
                : `${messageStyles.message} ${messageStyles.userMessage}`
            }
          >
            {renderMessageContent(msg.text, ind)}
          </div>
        ))
      ) : (
        <div className={messageStyles.noMessages}>Ask something to start chat</div>
      )}

      {/* Display a loader if assistant is typing */}
      {loading && (
        <div style={{ display: "flex" }}>
          <DropInOne>
            <div className={messageStyles.dot}></div>
          </DropInOne>
          <DropInTwo>
            <div className={messageStyles.dot}></div>
          </DropInTwo>
          <DropInThree>
            <div className={messageStyles.dot}></div>
          </DropInThree>
        </div>
      )}

      {/* Invisible div to ensure scroll to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
