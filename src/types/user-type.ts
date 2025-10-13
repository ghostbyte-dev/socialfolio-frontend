export enum Status {
  Visible = "visible",
  Hidden = "hidden",
  Disabled = "disabled",
  Unverified = "unverified"
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  description: string;
  avatar: string;
  status: Status;
}