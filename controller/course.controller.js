const courseService = require('../domain/service/course.service');


const CourseController = {

    async getCourses(req, res) {
        const courses = await courseService.getCourses();
        return res.status(200).send(courses);
    },

    async getCourse(req, res) {
        console.log(req.params.id);
        const course = await courseService.getCourseById(req.params.id);
        if (!course) {
            return res.status(404).send("Could not find the course with the given id")
        }

        return res.status(200).send(course);
    },
    async creatCourse(req, res) {
        const {value, error} = courseService.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const course = await courseService.createCourse(req.body);
        return res.status(201).send(course);
    },
    async deleteCourse(req, res) {
        const course = await courseService.deleteCourseById(req.params.id);
        if (!course) {
            return res.status(404).send("Could not find the course with the given id")
        }

        return res.send("Course with given id was deleted successfully")
    },

    async updateCourse(req, res) {
        const {value, error} = courseService.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const course = await courseService.updateCourseById(req.params.id, req.body);

        return res.status(200).send(course);
    }

};

module.exports = CourseController;