import fs from "fs";
import path from "path";

const findAll = fs.readFileSync(
  path.join(import.meta.dirname, "findAll.sql"),
  "utf8",
);

const userQueries = {
  findAll,
};

export default userQueries;
