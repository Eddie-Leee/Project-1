import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profle-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import authService from "./services/auth-service";

function App() {
  let [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/register" element={<RegisterComponent />}></Route>
        <Route
          path="/login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProfileComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        ></Route>
        <Route
          path="/course"
          element={
            <CourseComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}/>
          }
        ></Route>
        <Route
          path="/postCourse"
          element={
            <PostCourseComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}/>
          }
        ></Route>
        <Route
          path="/enroll"
          element={
            <EnrollComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}/>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
