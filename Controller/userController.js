const User = require("../Model/user");
const bcrypt = require("bcrypt");
const PasswordHistory = require('../Model/passwordHistory');

exports.signinUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Login successful
        const { password: _, ...userData } = user.toJSON();

        res.status(200).json({
            message: "Login successful.",
            data: userData
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

exports.signupUser = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            email,
            mobile,
            password,
            roleId
        } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            mobile,
            password: hashedPassword,
            roleId
        });

        // Remove password from response
        const { password: _, ...userData } = user.toJSON();

        res.status(201).json({
            message: "User registered successfully.",
            data: userData
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: {
                isDeleted: false
            },
            attributes: [
                'id',
                'firstName',
                'lastName',
                'email',
                'mobile',
                'roleId',
                'createdAt',
                'updatedAt'
            ]
        });

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

exports.updatePassword = async (req, res) => {
    try {

        const { email, currentPassword, newPassword } = req.body;

        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Email, current password and new password are required."
            });
        }


        // Find user
        const user = await User.findOne({
            where: { email }
        });


        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }


        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );


        if (!isCurrentPasswordValid) {
            return res.status(401).json({
                message: "Current password is incorrect."
            });
        }


        // Get last 2 passwords
        const previousPasswords = await PasswordHistory.findAll({
            where: {
                userId: user.id
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 2
        });


        // Check new password against last 2 passwords
        for (const oldPassword of previousPasswords) {

            const isSame = await bcrypt.compare(
                newPassword,
                oldPassword.password
            );

            if (isSame) {
                return res.status(400).json({
                    message: "You cannot reuse your last 2 passwords."
                });
            }
        }


        // Store current password in history
        await PasswordHistory.create({
            userId: user.id,
            password: user.password
        });


        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );


        // Update password
        user.password = hashedPassword;
        await user.save();


        // Keep only last 2 passwords
        const allPasswords = await PasswordHistory.findAll({
            where: {
                userId: user.id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });


        if (allPasswords.length > 2) {

            const deletePasswords = allPasswords.slice(2);

            await PasswordHistory.destroy({
                where: {
                    id: deletePasswords.map(x => x.id)
                }
            });
        }


        return res.status(200).json({
            message: "Password updated successfully."
        });


    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { firstName, lastName,  mobile } = req.body;
        const user = await User.findByPk(id).then(user => {
            if (user) {
                if (firstName) user.firstName = firstName;
                if (lastName) user.lastName = lastName;
                if (mobile) user.mobile = mobile;
            }
            return user.save();
        });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};
        
exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id).then(user => {
            if (user) {
                user.isDeleted = true;
            }
            return user.save();
        });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

exports.blockUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id).then(user => {
            if (user) {
                user.isBlocked = true;
            }
            return user.save();
        });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};