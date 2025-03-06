import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

export default function GetInTouch() {
  return (
    <div className="my-20 flex flex-row justify-between items-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-[40px] font-bold leading-snug relative">
          Get in Touch with
          <br />
          Smokin&apos;Notes
        </h1>
        <p className="text-[16px] font-[400]">
          Have questions or need assistance? We&apos;re
          <br />
          here to help! Reach out via email or fill out
          <br />
          the form below, and we&apos;ll get back to you soon.
        </p>
        <h3 className="text-[24px] font-bold text-primary">info@SmokinNotes.com</h3>
      </div>
      <div className="flex flex-col p-10 rounded-[40px] gap-6 bg-white">
        <div className="flex flex-row gap-4">
          <div>
            <Label className="text-[12px] px-3">Name</Label>
            <Input
              className="rounded-[24px] h-16 text-[14px] px-5 w-[420px]"
              placeholder="Full Name"
            />
          </div>
          <div>
            <Label className="text-[12px] px-3">Email Address</Label>
            <Input
              className="rounded-[24px] h-16 text-[14px] px-5 w-[420px]"
              placeholder="Your Contact Email"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div>
            <Label className="text-[12px] px-3">Phone Number</Label>
            <Input
              className="rounded-[24px] h-16 text-[14px] px-5 w-[420px]"
              placeholder="+1 (123) 567-8900"
            />
          </div>
          <div>
            <Label className="text-[12px] px-3">What is this about?</Label>
            <Select
            >
              <SelectTrigger
                className={cn(
                  "rounded-[24px] h-16 text-[14px] px-5 w-[420px] text-gray-500"
                )}
              >
                <SelectValue placeholder="What is this about?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div>
            <Label className="text-[12px] px-3">Select Class</Label>
            <Select
            >
              <SelectTrigger
                className={cn(
                  "rounded-[24px] h-16 text-[14px] px-5 w-[420px] text-gray-500"
                )}
              >
                <SelectValue placeholder="Select Class..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
                <SelectItem value="3">Class 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[12px] px-3">Select Exam</Label>
            <Select
            >
              <SelectTrigger
                className={cn(
                  "rounded-[24px] h-16 text-[14px] px-5 w-[420px] text-gray-500"
                )}
              >
                <SelectValue placeholder="Select Exam..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Exam 1</SelectItem>
                <SelectItem value="2">Exam 2</SelectItem>
                <SelectItem value="3">Exam 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="text-[12px] px-3">Message</Label>
          <Textarea
            className="rounded-[24px] text-[14px] p-5"
            placeholder="Type here.."
            rows={5}
          />
        </div>
        <Button className="h-[51px] rounded-2xl px-6 w-[138px] text-[14px]">
        Send Message
        </Button>
      </div>
    </div>
  );
}
