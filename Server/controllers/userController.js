import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/user.js";

// Signup new user
export const signUp = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newuser = new User.create({
            fullName,
            email,
            password: hashPassword,
            bio
        });

        const token = generateToken(newuser._id);

        res.json({ success: true, userData: newuser, message: "User created successfully", token });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}


// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.json({ success: false, message: "email not found" });
        }

        const checkPassword = await bcrypt.compare(password, userData.password);

        if (!checkPassword) {
            return res.json({ success: false, message: "password wrong" });
        }

        const token = generateToken(userData._id);

        res.json({ success: true, userData, token, message: "LoggedIn Successfully" });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}


// Controller to check if the user is authenticated or not!
export const checkAuth = async (req, res) => {
    res.json({ success: true, user: req.user });
}

// controller to updated user profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, fullName, bio } = req.body;
        const userId = req.body.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, fullName, bio }, { new: true });
        }

        res.json({ success: true, userData: updatedUser })

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}