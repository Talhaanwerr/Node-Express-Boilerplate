'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Attendance table create karne ka code
        await queryInterface.createTable('attendances', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', // User model se foreign key ka reference
                    key: 'id',
                },
                onUpdate: 'CASCADE', // Foreign key update cascade
                onDelete: 'CASCADE', // Foreign key delete cascade
                allowNull: false,
            },
            check_in_time: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW, // Default check-in time current time
            },
            check_out_time: {
                type: Sequelize.DATE,
                allowNull: true, // Check-out time optional rakha
            },
            status: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'present', // Default status "present" set kiya
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW, // Creation time default to current
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW, // Update time default to current
            },
        });
    },

    async down(queryInterface, Sequelize) {
        // Attendance table drop karne ka code
        await queryInterface.dropTable('attendances');
    }
};