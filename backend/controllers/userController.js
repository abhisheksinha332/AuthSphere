import User from "../models/user.js";

// Public user lookup: return minimal public fields
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await User.findById(id).select("_id name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return public fields only
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Protected user lookup: return private fields (requires authentication)
export const getPrivateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    // Ensure the requester is the same user
    const requesterId = req.user && req.user.userId;
    if (!requesterId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (requesterId !== id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
