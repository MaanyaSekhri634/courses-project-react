import Card from "./Card";
import React, { useState } from 'react';

const Cards = (props) => {
    console.log(props.category);
    console.log(props.courses);

    let category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);

    // Ensure courses are safely retrieved from props
    function getCourses() {
        if (category === "All") {
            let allCourses = [];
            // Check if props.courses is an object and has values
            if (props.courses && Object.keys(props.courses).length > 0) {
                Object.values(props.courses).forEach((array) => {
                    // to understand what happens here, see structure once using chat gpt 
                    array.forEach((courseData) => {
                        allCourses.push(courseData);
                    });
                }); 
            }
            return allCourses;
        } else {
            // Check if the category exists within props.courses
            if (props.courses && props.courses[category]) {
                return props.courses[category];
            }
            return [];  // Return an empty array if the category is not found
        }
    }

    const courses = getCourses();

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-4">
            {
                courses.length > 0 ? (
                    courses.map((course) => {
                        return (
                            <Card
                                course={course}
                                key={course.id}  // Use course.id as the key, not props.courses.id
                                likedCourses={likedCourses}
                                setLikedCourses={setLikedCourses}
                            />
                        );
                    })
                ) : (
                    <p>No courses available.</p>  // Display a message when no courses are found
                )
            }
        </div>
    );
};

export default Cards;

