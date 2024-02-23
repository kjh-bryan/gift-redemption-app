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
  flatteredUsers: [
    {
      username: "BOSS_6FDFMJGFV6YM",
      role_name: "BOSS",
      team_name: "GRYFFINDOR",
      created_at: "2021-05-11T19:39:25.320Z",
    },
    {
      username: "MANAGER_P49NK2CS3B5G",
      role_name: "MANAGER",
      team_name: "GRYFFINDOR",
      created_at: "2021-03-03T15:18:30.249Z",
    },
  ],
  unflatteredUsers: [
    {
      username: "BOSS_6FDFMJGFV6YM",
      role_name: "BOSS",
      UserTeams: [
        {
          team_name: "GRYFFINDOR",
          created_at: "2021-05-11T19:39:25.320Z",
        },
      ],
    },
    {
      username: "MANAGER_P49NK2CS3B5G",
      role_name: "MANAGER",
      UserTeams: [
        {
          team_name: "GRYFFINDOR",
          created_at: "2021-03-03T15:18:30.249Z",
        },
      ],
    },
  ],
  userTeam: [
    {
      staff_pass_id: "STAFF",
      team_name: "GRYFFINDOR",
    },
    {
      staff_pass_id: "MANAGER",
      team_name: "SLYTHERIN",
    },
  ],
};
