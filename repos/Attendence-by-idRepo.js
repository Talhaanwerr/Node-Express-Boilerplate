const { Attendance, User } = require("../models");

class AttendanceRepo {
    // Get all attendance records that are not soft deleted with associated user
    static async findAll({ offset = 0, limit = 10, sort = 'date', order = 'ASC', search = '', filterByStatus }) {
        try {
            const queryOptions = {
                where: { deleted: false },
                include: [{
                    model: User,
                    as: "user",
                }],
                order: [
                    [sort, order]
                ],
                offset: parseInt(offset),
                limit: parseInt(limit),
            };

            // Apply search filter if provided
            if (search) {
                queryOptions.where = {
                    ...queryOptions.where,
                    [Op.or]: [{
                            remarks: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            '$user.name$': {
                                [Op.like]: `%${search}%`
                            }
                        }, // Assuming the User model has a 'name' field
                    ],
                };
            }

            // Apply status filter if provided
            if (filterByStatus) {
                queryOptions.where = {
                    ...queryOptions.where,
                    status: filterByStatus,
                };
            }

            const attendances = await Attendance.findAll(queryOptions);
            return attendances;
        } catch (error) {
            console.error("Error fetching all attendance records:", error);
            throw new Error("Database error occurred while retrieving all attendance records");
        }
    }

    // Find attendance by ID if it's not soft deleted and include associated user
    static async findById(id) {
        try {
            const attendance = await Attendance.findOne({
                where: { id, deleted: false }, // Exclude soft-deleted records
                include: [{
                    model: User,
                    as: "user", // Use the alias defined in the Attendance model
                }],
            });
            return attendance; // Return the found attendance record
        } catch (error) {
            console.error(`Error fetching attendance record with ID ${id}:`, error);
            throw new Error(`Database error occurred while retrieving attendance with ID ${id}`);
        }
    }


    static async createAttendance(data) {
        try {
            const createdAttendance = await Attendance.create(data);
            return createdAttendance;
        } catch (error) {
            console.error("Error creating attendance record:", error);
            throw new Error("Database error occurred while creating the attendance record");
        }
    }

    // Update an existing attendance record by ID
    static async updateAttendance(id, data) {
        try {
            await Attendance.update(data, { where: { id } });
            return await this.findById(id); // Fetch the updated record
        } catch (error) {
            console.error(`Error updating attendance record with ID ${id}:`, error);
            throw new Error(`Database error occurred while updating attendance with ID ${id}`);
        }
    }

    // Soft delete an attendance record by ID (set deleted to true)
    static async deleteAttendance(id) {
        try {
            await Attendance.update({ deleted: true }, { where: { id } });
        } catch (error) {
            console.error(`Error deleting attendance record with ID ${id}:`, error);
            throw new Error(`Database error occurred while deleting attendance with ID ${id}`);
        }
    }
}

module.exports = AttendanceRepo;