"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/Image";
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
          className="w-[26px] h-[26px] rounded-md bg-white hover:bg-gray-50 border-none text-[#949494] shadow-none p-0 [&_svg]:size-4"
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
          <div className="flex flex-col gap-4 pt-4">
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
        <div className="w-full">
          <div className="border border-[#ddd] h-[56px] rounded-[16px] flex flex-row items-center pr-2 gap-2">
            <Input
              className="text-[14px] border-0 shadow-none focus-visible:ring-0"
              placeholder="Chat with SN tutor AI..."
              value={message}
              onChange={handleMessageChange}
            />
            <Button
              className="h-[32px] w-[32px] flex-shrink-0 shadow-none rounded-[8px] text-[14px] bg-white hover:bg-gray-50 border border-[#ddd] text-[#ddd] px-0"
              onClick={handleSubmit}
            >
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function UserMessage({ message }: { message: string }) {
  return (
    <div className="ml-6 text-[#333333] text-[14px] font-[400] bg-[#F2F2F2] rounded-[16px] px-3 py-2">
      {message}
    </div>
  );
}

export function AIMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-row gap-1">
      <div className="w-6 h-6 flex-shrink-0 rounded-full border-red-500 overflow-hidden -translate-x-0 border">
        <Image
          src="/assets/images/avatar.jpg"
          alt=""
          width={30}
          height={30}
          objectFit="cover"
          className="-translate-x-0.5 -translate-y-1"
        />
      </div>
      <div className="mr-6 text-[14px] font-[400] bg-[#FEF2F2] text-[#333333] rounded-[16px] px-3 py-2">
        {message}
      </div>
    </div>
  );
}

export default ChatInput;
