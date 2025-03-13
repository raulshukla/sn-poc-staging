"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendIcon } from "lucide-react";
import { api } from "@/lib/api";
import PerfectScrollbar from "react-perfect-scrollbar";

export interface ChatProps {
  content: string;
  role: string;
}

type ChatInputProps = {
  messages: ChatProps[];
  setMessages: (messages: ChatProps[]) => void;
};

// type ResponseData = {
//   title: string;
//   description: string;
// };

const ChatInput: React.FC<ChatInputProps> = ({ messages, setMessages }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const { data: response } = await api.post<string>("/openai/chat", {
        role: "user",
        content: message,
      });
      setMessages([
        ...messages,
        {
          role: "user",
          content: message,
        },
        {
          role: "ai",
          content: response,
        },
      ]);
      setMessage("");
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return messages.length > 0 ? (
    <div className="bg-white w-[300px] pl-3 py-3 flex flex-shrink-0 flex-col border-l right-0">
      <h1 className="text-[20px] font-bold pr-3 mb-4">ChatBot Tutor</h1>
      <div className="flex-grow h-0 overflow-hidden">
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          style={{ paddingRight: 20 }}
        >
          <div className="flex flex-col gap-4">
            {messages.map((message: ChatProps, index: number) =>
              message.role == "user" ? (
                <UserMessage key={index} message={message.content} />
              ) : (
                <AIMessage key={index} message={message.content} />
              )
            )}
          </div>
        </PerfectScrollbar>
      </div>
      <div className="flex flex-col pr-3 mt-4">
        <Label className="text-[12px] px-3">Ask a question or provide a prompt...</Label>
        <div className="w-full flex flex-row gap-4">
          <Input
            className="rounded-[24px] h-[59px] text-[14px] px-5"
            placeholder="Type here..."
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            className="h-[59px] rounded-[12px] px-5 text-[14px]"
            onClick={handleSubmit}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white bottom-0 w-full flex flex-row justify-between gap-4 p-6 items-end border-t">
      <div className="w-full">
        <Label className="text-[12px] px-3">Ask a question or provide a prompt...</Label>
        <Input
          className="rounded-[24px] h-[59px] text-[14px] px-5"
          placeholder="Type here..."
          value={message}
          onChange={handleMessageChange}
        />
      </div>
      <Button
        className="h-[59px] rounded-[12px] px-6 w-[126px] text-[14px]"
        onClick={handleSubmit}
      >
        Submit <SendIcon />
      </Button>
    </div>
  );
};

export function UserMessage({ message }: { message: string }) {
  return (
    <div className="ml-6 text-white text-[14px] font-[400] bg-primary rounded-[16px] px-3 py-2">
      {message}
    </div>
  );
}

export function AIMessage({ message }: { message: string }) {
  return (
    <div className="mr-6 text-[14px] font-[400] bg-secondary rounded-[16px] px-3 py-2">
      {message}
    </div>
  );
}

export default ChatInput;
