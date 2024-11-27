import {DataTypes, Model, Sequelize} from "sequelize";
import {faker} from "@faker-js/faker";

const sequelize = new Sequelize('sqlite::memory');

// init here

try {
    sequelize.authenticate();
} catch (e) {
    console.error('Unable to connect to the database:', e);
}

export default sequelize;

class Customer extends Model {}

Customer.init(
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Customer', // We need to choose the model name
    },
);

const promises = [];
// create 100 customers
for (let i = 0; i < 100; i++) {
    promises.push(Customer.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
    }));
}

Promise.all(promises).then(() => {
    console.log('Created 100 customers!');
});


export {Customer};