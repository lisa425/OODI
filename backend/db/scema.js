import SQ from 'sequelize';

import { sequelize } from './database.js';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        phonenum: {
            type: DataTypes.STRING(13),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }
)

export const Lesson = sequelize.define(
    'lesson',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        subCategory: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        detail: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parking: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
)


export const Timetable = sequelize.define(
    'timetable',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        time: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        continuousTime: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
User.hasMany(Timetable)
Timetable.belongsTo(User);

export const LessonTime = sequelize.define(
    'lessonTime',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        originPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        people: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        appliable: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
)
Lesson.hasMany(LessonTime)
LessonTime.belongsTo(Lesson)

export const Image = sequelize.define(
    'image',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)
Lesson.hasMany(Image);
Image.belongsTo(Lesson);

export const Reservation = sequelize.define(
    'reservation',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        lessonTimeId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)
User.hasMany(Reservation)
Lesson.hasMany(Reservation)
Reservation.belongsTo(User)
Reservation.belongsTo(Lesson)



export const Review = sequelize.define(
    'review',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
)
User.hasMany(Review)
Lesson.hasMany(Review)
LessonTime.hasMany(Review)
Review.belongsTo(User)
Review.belongsTo(Lesson)
Review.belongsTo(LessonTime)