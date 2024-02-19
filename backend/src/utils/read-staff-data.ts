import fs from "fs";
import csvParser from "csv-parser";

const filePath = "data/staff-id-to-team-mapping-long.csv";

export interface StaffMapping {
  staff_pass_id: string;
  team_name: string;
  created_at: number;
}

export const readStaffData = async (
  type: "BOSS" | "MANAGER" | "STAFF" | "ALL",
): Promise<StaffMapping[]> => {
  return new Promise((resolve, reject) => {
    const staff: StaffMapping[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        const staffPassIdPrefix = data.staff_pass_id.split("_")[0];
        if (type === "ALL") {
          staff.push(data as StaffMapping);
        } else if (staffPassIdPrefix === type) {
          staff.push(data as StaffMapping);
        }
      })
      .on("end", () => {
        resolve(staff);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const getStaffTeam = async (staffPassId: string) => {
  const staffPassIdPrefix = staffPassId.split("_")[0];

  let staff: StaffMapping[] = [];

  switch (staffPassIdPrefix) {
    case "BOSS":
      staff = await readStaffData("BOSS");
      break;
    case "MANAGER":
      staff = await readStaffData("MANAGER");
      break;
    case "STAFF":
      staff = await readStaffData("STAFF");
      break;
    default:
      staff = await readStaffData("ALL");
      break;
  }
  const staffFound = staff.find((staff) => staff.staff_pass_id === staffPassId);

  return staffFound;
};
