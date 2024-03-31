const Joi = require('joi');
const courseRepository = require('../repository/course.repository');


const CourseService = {

    async getCourses() {
        return courseRepository.find();
    },

    async createCourse(course) {
        return courseRepository.create(course);
    },

    async getCourseById(id) {
        return courseRepository.findById(id);
    },

    async deleteCourseById(id) {
        return courseRepository.findByIdAndDelete(id);
    },
    async updateCourseById(id, course) {
        return courseRepository.findByIdAndUpdate(id, {
                $set: {
                    name: course.name
                }
            },
            {new: true}
        );
    },

    validate(course) {
        const schema = Joi.object({
            name: Joi.string().required(),
            author: Joi.string().required(),
            tags: Joi.array().required(),
            date: Joi.date().required(),
            isPublished: Joi.bool().required(),
        });

        return schema.validate(course);
    }

};

module.exports = CourseService;
