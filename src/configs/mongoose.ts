import mongoose from "mongoose";

export default () => {
  mongoose.connect("mongodb://localhost:27017/ANN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", (e) => console.log(e));
  db.once("open", () => console.log("mongoose connection success!"));
};
