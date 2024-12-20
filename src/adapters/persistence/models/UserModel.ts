import {CreationOptional, DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../../../bootstrap/database";
import bcrypt from "bcryptjs";

type UserAttributes = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: CreationOptional<string>;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare password: string;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: {
                isUUID: {
                    args: 4,
                    msg: 'Please enter a valid UUID.',
                }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'users_email',
                msg: 'Unique error: A user with this email already exists.',
            },
            validate: {
                notNull: {
                    msg: 'Email is required.',
                },
                isEmail: {
                    msg: 'Please enter a valid email address.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 255],
                    msg: 'Reason: Password must be between 8 and 255 characters long.',
                },
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    msg: 'Reason: Password must include uppercase, lowercase, number, and special character.',
                }
            }

        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

UserModel.prototype.validatePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default UserModel;
