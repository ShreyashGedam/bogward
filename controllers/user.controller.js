const { Router } = require("express");
const UserModal = require("../models/user.model");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    const existingUser = await UserModal.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const user = new UserModal({ name, email, mobile });
    await user.save();

    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

userRouter.patch("/updateByMobile/:mobile", async (req, res) => {
  const { mobile } = req.params;
  const updateFields = req.body;

  if (!mobile) {
    return res.status(400).send({ message: "Mobile number is required" });
  }

  try {
    // Find the user by mobile number and update
    const updatedUser = await UserModal.findOneAndUpdate(
      { mobile },
      updateFields,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the model's schema
      }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
});

userRouter.get("/all", async (req, res) => {
  try {
    const users = await UserModal.find({});
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
});

userRouter.delete("/deleteByMobile/:mobile", async (req, res) => {
  const { mobile } = req.params;

  if (!mobile) {
    return res.status(400).send({ message: "Mobile number is required" });
  }

  try {
    const deletedUser = await UserModal.findOneAndDelete({ mobile });

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
});

module.exports = userRouter;
