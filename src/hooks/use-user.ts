import { UserContextValue } from "@/context/types";
import { UserContext } from "@/context/user-context";
import { useContext } from "react";

const UseUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UseUser;
