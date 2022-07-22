"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Users", [{
            email: "khakha057@gmail.com",
            password: "",
            firstName: "huy",
            lastName: "le",
            address: "hanoi",
            phoneNumber: "01228417417",
            gender: 1,
            roleId: "admin",

            createdAt: new Date(),
            updatedAt: new Date(),
        }, ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};