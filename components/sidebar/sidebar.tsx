"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { MinusIcon, Plus, PlusIcon } from "lucide-react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { cn } from "@/lib/utils";
import Toggle from "../ui/toggle";

export default function SideBar() {
  const [openItems, setOpenItems] = useState<string[]>([
    "packet-status",
    "announcements",
  ]);

  const [isGenAI, setIsGenAI] = useState<boolean>(true);
  const [isContent, setIsContent] = useState<boolean>(true);

  const handleValueChange = (values: string[]) => {
    setOpenItems(values);
  };

  return (
    <div className="relative border-r bg-white min-w-[320px] max-w-[320px] flex flex-col justify-start gap-6 pl-3 py-6">
      <Button className="h-[51px] rounded-2xl mr-3">Subscribe to Gain Access</Button>
      <div className="flex flex-row justify-between items-center pr-3">
        <Label className="text-[20px] font-bold">Generative AI</Label>
        <Toggle checked={isGenAI} onCheckedChange={setIsGenAI} />
      </div>
      <div className="flex flex-row justify-between items-center pr-3">
        <Label className="text-[20px] font-bold">Content</Label>
        <Toggle
          checked={isContent}
          onCheckedChange={setIsContent}
          labels={["Concise", "Full"]}
        />
      </div>
      <div className="overflow-hidden h-0 flex flex-grow">
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          style={{ paddingRight: 20 }}
        >
          <div className="h-full flex w-[296px] max-w-[296px]">
            <Accordion
              type="multiple"
              className="w-full"
              value={openItems}
              onValueChange={handleValueChange}
            >
              <AccordionItem value="packet-status">
                <AccordionTrigger
                  className={cn(
                    "font-medium",
                    openItems.includes("packet-status") && "text-primary"
                  )}
                >
                  <p className="text-[16px] font-[500]">Packet Status</p>
                  {openItems.includes("packet-status") ? <MinusIcon /> : <PlusIcon />}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-row justify-between gap-7">
                      <div className="relative ml-2 flex flex-row justify-center items-center">
                        <div className="w-[4px] h-[51px] bg-[#F5F5F5]"></div>
                        <div className="absolute top-3 -left-1.5 w-[16px] h-[16px] rounded-full bg-primary"></div>
                      </div>
                      <div className="relative px-3 py-2 flex-1 flex-col bg-[#F5F5F5] rounded-[8px]">
                        <img
                          className="absolute -left-4 top-2"
                          src="/assets/images/guide_1.png"
                          alt=""
                          width={20}
                          height={16}
                        />
                        <h3 className="text-[14px] font-bold">Exam 1</h3>
                        <p className="text-[12px] font-[400]">
                          Pickup available starting, Sun 2/9
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="announcements">
                <AccordionTrigger
                  className={cn(
                    "font-medium",
                    openItems.includes("announcements") && "text-primary"
                  )}
                >
                  <p className="text-[16px] font-[500]">Announcements</p>
                  {openItems.includes("announcements") ? <MinusIcon /> : <PlusIcon />}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="study-guides">
                <AccordionTrigger
                  className={cn(
                    "font-medium",
                    openItems.includes("study-guides") && "text-primary"
                  )}
                >
                  <div className="flex flex-row justify-between w-full pr-5">
                    <h3 className="text-[16px] font-[500]">Study Guides</h3>
                    <p className="text-[16px] font-[500]">
                      70<span className="text-[12px] font-[400]">%</span>
                    </p>
                  </div>
                  {openItems.includes("study-guides") ? <MinusIcon /> : <PlusIcon />}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="practice-exams">
                <AccordionTrigger
                  className={cn(
                    "font-medium",
                    openItems.includes("practice-exams") && "text-primary"
                  )}
                >
                  <div className="flex flex-row justify-between w-full pr-5">
                    <h3 className="text-[16px] font-[500]">Practice Exams</h3>
                    <p className="text-[16px] font-[500]">
                      1<span className="text-[12px] font-[400]">/3</span>
                    </p>
                  </div>
                  {openItems.includes("practice-exams") ? <MinusIcon /> : <PlusIcon />}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="flash-cards">
                <AccordionTrigger
                  className={cn(
                    "font-medium",
                    openItems.includes("flash-cards") && "text-primary"
                  )}
                >
                  <div className="flex flex-row justify-between w-full pr-5">
                    <h3 className="text-[16px] font-[500]">Flashcards</h3>
                    <p className="text-[16px] font-[500]">
                      17<span className="text-[12px] font-[400]">/34</span>
                    </p>
                  </div>
                  {openItems.includes("flash-cards") ? <MinusIcon /> : <PlusIcon />}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                    <div className="rounded-[12px] border-gray-200 border p-3 flex flex-col justify-between gap-1">
                      <p className="text-[10px] font-[400] text-gray-300">12 hours ago</p>
                      <h4 className="text-[14px] font-bold">
                        New Content Posted Weekly!
                      </h4>
                      <p className="text-[12px] font-[400] line-clamp-3 leading-4 text-gray-300">
                        New study guides and practice quizzes are posted every weekend!
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </PerfectScrollbar>
      </div>
      <div className="bottom-0 left-0 w-full pr-3 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1 justify-between items-center">
          <Button className="text-[12px] font-[500] text-center px-2 py-2" variant="link">
            Terms
          </Button>
          |
          <Button className="text-[12px] font-[500] text-center px-2 py-2" variant="link">
            Help
          </Button>
          |
          <Button className="text-[12px] font-[500] text-center px-2 py-2" variant="link">
            Contact
          </Button>
          |
          <Button className="text-[12px] font-[500] text-center px-2 py-2" variant="link">
            App
          </Button>
        </div>
        <div className="bg-[#FFE5E5] rounded-[8px] p-2">
          <img
            src="/assets/images/icon.png"
            alt=""
            className="w-6 h-6"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
