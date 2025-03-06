import { Button } from "../ui/button";

export const Header = () => (
  <div className="flex flex-row w-full justify-between px-16 py-2 rounded-md shadow-md z-50 sticky items-center bg-white">
      <div className="flex flex-row gap-8">
        <img src="/assets/images/logo.png" alt="" className="h-8" />
        <div className="h-8 flex flex-row justify-center items-center gap-2 bg-slate-100 rounded-full px-3">
          <div className="h-2 w-2 rounded-full bg-[#00ff00]" />
          <span className="text-red-500">{784}</span> Members Online
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button variant="link">Classes</Button>
        <Button variant="link">Locations</Button>
        <Button variant="link">Jobs</Button>
        <Button variant="link">Contact</Button>
        <Button variant="link">Membership</Button>
        <Button variant="link">Admin</Button>
        <div>
          <Button variant="secondary" className="h-12 rounded-2xl px-6 mr-2">
            Login
          </Button>
          <Button className="h-[51px] rounded-2xl px-6">Create Account</Button>
        </div>
      </div>
    </div>
);

Header.displayName = "Header";
