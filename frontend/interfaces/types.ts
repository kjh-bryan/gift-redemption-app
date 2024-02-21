export interface RedemptionProps {
  gift_name: string;
  team_name: string;
}

export interface TeamProps {
  team_name: string;
}

export interface RoleProps {
  role_name: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface RegisterProps {
  username: string;
  password: string;
  team_name: string;
  role_name: string;
}
