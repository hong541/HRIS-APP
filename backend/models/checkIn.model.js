import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  photo: { type: String, required: true },
  location: { type: String, required: true },
  checkInTime: { type: Date, default: Date.now },
});

const Checkin = mongoose.model("Checkin", checkInSchema);

export default Checkin;
