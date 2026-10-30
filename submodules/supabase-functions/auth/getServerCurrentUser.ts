import { getServerUser } from "./getServerUser";
import { use } from "react";
import { getServerSessionUser } from "./getServerSessionUser";
import { User } from "@/types/database";

export const getServerCurrentUser = async () => {
  const user = await getServerSessionUser();
  let serverUser: User | null | undefined;
  if (user) {
    const { data: serverUserData, error } = await getServerUser(user.id);
    serverUser = serverUserData;
  }
  return serverUser;
};

export const useServerCurrentUser = () => {
  return use(getServerCurrentUser());
};
