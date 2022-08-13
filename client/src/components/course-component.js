import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/courses-service";

const CourseComponent = (props) => {
  let { currentUser, getCurrentUser } = props;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log("Using Effect");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    if (currentUser.user.role == "instructor") {
      CourseService.get(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role == "student") {
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You can't see courses without authentication</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            Take me to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Welcome to instructor's course page</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>Welcome to student's course page</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div>
          <p>Here's the data we got back from server.</p>
          {courseData.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">
                  Student Count : {course.students.length}
                </p>
                <button className="btn btn-primary">{course.price}</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default CourseComponent;
