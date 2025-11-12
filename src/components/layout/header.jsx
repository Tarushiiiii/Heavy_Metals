import { Bell, ArrowRight, Languages } from "lucide-react";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import "./layout.css";
import { Button } from "../ui/button";
import { LanguageDropdown } from "./languageDropdown";
import { Notifications } from "./notifications";

export const Header = ({ userName, children }) => {
  const linkBaseClass =
    "flex items-center justify-center gap-3 px-4 py-2 rounded transition-colors whitespace-nowrap";

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <header className="header-container">
      <nav className="header-left">
        <div className="header-head">
          {children === "Dashboard" && children}
        </div>
        <div className="header-item">Welcome {userName}!</div>
      </nav>
      <nav className="header-right">
        <Notifications />
        <LanguageDropdown />
        <div className="header-item">
          {user ? (
            <UserButton />
          ) : (
            <Button
              onClickHandler={openSignIn}
              type="main"
              colorVariant="primary"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
