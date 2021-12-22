import Mock from "mockjs";
import getParams from "utils/tool";
import { UserGroup } from "types/user";

const USER_MAP: UserGroup = {
  super_admin: {
    name: "super_admin",
    user_id: "1",
    access: ["super_admin", "admin"],
    token: "super_admin",
    avatar:
      "https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png",
  },
  admin: {
    name: "admin",
    user_id: "2",
    access: ["admin"],
    token: "admin",
    avatar: "https://avatars0.githubusercontent.com/u/20942571?s=460&v=4",
  },
};

export const getUserList = (req: any) => {
  const params: string = getParams(req.url);
  return USER_MAP[params];
};

export const getTableData = () => {
  const tableData: any[] = [];
  tableData.push(
    Mock.mock({
      name: "@name",
      email: "@email",
      createTime: "@date",
    }),
  );
  return tableData;
};
