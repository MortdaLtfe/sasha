import mongoose from "mongoose";
export default function () {
  return mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Successfuly Connecting to database");
    })
    .catch(e => console.log(`fail connecting to db ${e}`));
}
