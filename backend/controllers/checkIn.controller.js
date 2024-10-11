import Checkin from "../models/checkIn.model.js";

export const checkin = async (req, res) => {
  try {
    const { userId, location } = req.body;
    const newCheckin = new Checkin({
      userId,
      photo: req.file.path,
      location,
    });
    await newCheckin.save();
    res.status(201).json(newCheckin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const checkout = async (req, res) => {
  try {
    const { userId, location } = req.body;
    const newCheckout = new Checkin({
      userId,
      photo: req.file.path,
      location,
    });
    await newCheckout.save();
    res.status(201).json(newCheckout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
