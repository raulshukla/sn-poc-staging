"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MessagesSquare, SendIcon, X } from "lucide-react";
import { api } from "@/lib/api";
import PerfectScrollbar from "react-perfect-scrollbar";
import { cn } from "@/lib/utils";

export interface ChatProps {
  content: string;
  role: string;
}

type ChatInputProps = {
  isOpen: boolean;
  SetIsOpen: (opened: boolean) => void;
};

// type ResponseData = {
//   title: string;
//   description: string;
// };

const ChatInput: React.FC<ChatInputProps> = ({ isOpen, SetIsOpen }) => {
  const [messages, setMessages] = useState<ChatProps[]>([]);
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

  if (!isOpen)
    return (
      <Button
        className="fixed right-6 bottom-6 w-[60px] h-[60px] rounded-full bg-[#FFE5E5] hover:bg-[#f3d6d6] shadow-md text-primary p-0 [&_svg]:size-[30px]"
        onClick={() => SetIsOpen(true)}
      >
        <MessagesSquare width={30} height={30} />
      </Button>
    );

  return (
    <div
      className={cn(
        "transition-all bg-white flex flex-shrink-0 flex-col border-l right-0",
        isOpen ? "w-[300px]" : "w-0"
      )}
    >
      <h1 className="flex flex-row justify-between items-center text-[20px] font-bold p-3 border-b">
        SN Tutor
        <Button
          className="w-[26px] h-[26px] rounded-md bg-[#F5F5F5] hover:bg-[#EEE] border border-[#DDD] text-primary p-0 [&_svg]:size-4"
          onClick={() => SetIsOpen(false)}
        >
          <X width={30} height={30} />
        </Button>
      </h1>
      <div className="flex-grow h-0 overflow-hidden pl-3">
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
      <div className="flex flex-col p-3 mt-4 border-t">
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
