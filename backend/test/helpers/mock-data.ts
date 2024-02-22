export const mockedData = {
  users: [
    { username: "STAFF", password: "GRYFFINDOR", role_name: "STAFF" },
    { username: "MANAGER", password: "SLYTHERIN", role_name: "MANAGER" },
    { username: "ADMIN", password: "ADMIN", role_name: "ADMIN" },
  ],
  teamMapping: {
    STAFF: {
      staff_pass_id: "STAFF",
      team_name: "GRYFFINDOR",
      created_at: new Date(),
    },
    MANAGER: {
      staff_pass_id: "STAFF",
      team_name: "SLYTHERIN",
      created_at: new Date(),
    },
    ADMIN: {
      staff_pass_id: "ADMIN",
      team_name: "Administrator",
      created_at: new Date(),
    },
  },
  redemption: {
    gift_name: "Books Gift Voucher Feb 2024",
    team_name: "GRYFFINDOR",
    redeemed_at: "2022-01-01", // Replace with a valid date string
  },
  gifts: [
    {
      gift_name: "Books Gift Voucher Feb 2024",
      created_at: "2024-02-21T13:50:01.725Z",
    },
    {
      gift_name: "Movie Tickets Mar 2024",
      created_at: "2024-02-21T13:50:01.725Z",
    },
    {
      gift_name: "Amazon Gift Card Apr 2024",
      created_at: "2024-02-21T13:50:01.725Z",
    },
  ],
  roles: [
    {
      role_name: "STAFF",
    },
    {
      role_name: "MANAGER",
    },
    {
      role_name: "BOSS",
    },
  ],
  teams: [
    {
      team_name: "GRYFFINDOR",
    },
    {
      team_name: "SLYTHERIN",
    },
    {
      team_name: "HUFFLEPUFF",
    },
    {
      team_name: "RAVENCLAW",
    },
  ],
};