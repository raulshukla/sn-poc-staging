import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <div className="font-light">
      <div className="px-16 flex flex-row justify-between gap-8 h-20 py-2 items-center bg-white">
        <img src="/assets/images/logo.png" alt="" className="h-8" />
        <div>
            <Button variant="link">Privacy</Button>
            <Button variant="link">Terms</Button>
            <Button variant="link">Help</Button>
            <Button variant="link">Contact</Button>
            <Button variant="link">App</Button>
        </div>
        <img src="/assets/images/icon.png" alt="" className="h-6" />
      </div>
      <p className="bg-primary py-3 text-[12px] text-white text-center">
        © 2025 Smokin&rsquo;Notes Inc. All rights reserved.
      </p>
    </div>
  );
};

Footer.displayName = "Footer";
