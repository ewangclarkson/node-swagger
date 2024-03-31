const {describe, expect, it,beforeAll} = require("@jest/globals");
const courseService = require('../../../../domain/service/course.service');
const courseRepository = require('../../../../domain/repository/course.repository');

jest.mock('../../../../domain/repository/course.repository');

let courses;
describe('course service', () => {

    beforeAll( ()=> {
        courses = [
            {id: 1, name: "Numerical Analysis",author: "Ewang Clarkson", tags: ["math"], date: new Date(), isPublished: false},
            {id: 2, name: "Calculus", author: "Ewang Clarkson", tags: ["math"], date: new Date(), isPublished: false}];
    });

    it('should get all courses', async () => {
        courseRepository.find.mockImplementation(() => courses);
        const dbCourses = await courseService.getCourses();
        expect(dbCourses).toEqual(expect.arrayContaining(courses));

    });

    it('should create a course', async () => {
        const newCourse = {
            name: "Introduction to computing",
            author: "Nde yanick",
            tags: ["math"],
            date: new Date(),
            isPublished: false
        };

        courseRepository.create.mockImplementation(() => courses[1]);
        const dbCourse = await courseService.createCourse(newCourse);
        expect(courseRepository.create).toHaveBeenCalledWith(newCourse);
        expect(dbCourse).toMatchObject(courses[1]);
    });


    it('should get a course by ID', async () => {
        courseRepository.findById.mockImplementationOnce(() => courses[0]);
        const dbCourse = await courseService.getCourseById(1);
        expect(courseRepository.findById).toHaveBeenCalledWith(1);
        expect(dbCourse).toMatchObject(courses[0]);

    });

    it('should delete a course by ID', async () => {
        courseRepository.findByIdAndDelete.mockImplementationOnce(() => courses[0]);
        await courseService.deleteCourseById(1);
        expect(courseRepository.findByIdAndDelete).toHaveBeenCalledWith(1);
    });


    it('should update a course by ID', async () => {
        const newCourse = {
            name: "Introduction to computing",
            author: "Nde yanick",
            tags: ["math"],
            date: new Date(),
            isPublished: false
        };
        courseRepository.findByIdAndUpdate.mockImplementationOnce(() => courses[1]);
        const dbCourse = await courseService.updateCourseById(1, newCourse);
        expect(courseRepository.findByIdAndUpdate.mock.calls[0][0]).toEqual(1);
        expect(dbCourse).toMatchObject(courses[1]);
    });

});

describe('validateCourse', () => {
    it('should throw an error if the inputs are invalid', () => {
        const newCourse = {};
        const {value, error} = courseService.validate(newCourse);
        expect(error).not.toBeNull();
    });


    it('should should validate the course with success and populate the value obeject', () => {
        const newCourse = {
            name: "Introduction to computing",
        };

        const {value, error} = courseService.validate(newCourse);
        expect(error).toBeUndefined();
        expect(value).toMatchObject(newCourse);
    });

})

