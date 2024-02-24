const { getCourseModel } = require("../../Model/CourseModel");
const Course = getCourseModel();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

async function AddCourse(req, resp) {
    console.log(req.body);
    const { user, details } = req.body;
    const { name, instructor, subject, price, starttime, endtime, topics } = details;
    try {
        if (!user.isStudent) {
            const result= await cloudinary.uploader.upload(req.file.path,{
                resource_type:'video',
                folder:'videos'
            });
            console.log("file uploaded successfully",result.url);

            const course = await Course.create({ name: name, instructor: instructor, subject: subject, price: price, starttime: starttime, endtime: endtime, topics: topics });
            resp.json(course);
        }
        else {
            throw Error("Student cannot add courses");
        }
    }
    catch (err) {
        console.log(err);
    }

}

async function ListCourses(req, resp) {
    try {
        const courses = await Course.find();
        resp.json(courses);
    }
    catch (err) {
        console.log(err);
    }
}


async function DisplayCourse(req, resp) {
    try {
        const _id = req.query.id;
        const coursedetails = await Course.findOne({ _id });
        if (coursedetails != null)
            resp.json(coursedetails);
        else throw Error("Course not available");
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = { ListCourses, AddCourse, DisplayCourse };