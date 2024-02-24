const Course = require("../../Model/CourseModel");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });


async function AddCourse(req, resp) {
    console.log(req.body);
    const { name, instructor, subject, price, starttime, endtime, topics } = req.body;
    try {
            const course = await Course.create({ name: name, instructor: instructor, subject: subject, price: price, starttime: starttime, endtime: endtime, topics: topics });
            resp.json(course);
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

async function getUserCourses(req, res) {
    const _id = req.user._id;

    try {
        const courses = await Course.find({ 'instructor.id': _id.toString() });
        res.json(courses)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

async function AddCourseVideo(req,resp)
{
    try
    {
        const { id,videodetails } = JSON.parse(req.body.data);
        console.log(req.file);

        if (!user.isStudent) {
            const result= await cloudinary.uploader.upload(req.file.path,{
                resource_type:'video',
                folder:'videos'
            });
            console.log("file uploaded successfully",result.url);

        const validcourse= await Course.updateOne({_id:id},{$set:{coursevideo:{...videodetails,"link":result.url}}})
        if(validcourse.matchedCount>0)
        {
            resp.json("video link added to database");
        }
        else reps.json("course not found");
        }
        else {
            throw Error("Student cannot add courses");
        }
    }
    catch(err)
    {
        console.log(err);
        resp.json(err);
    }
    
}

module.exports = { ListCourses, AddCourse, DisplayCourse, AddCourseVideo , getUserCourses };

