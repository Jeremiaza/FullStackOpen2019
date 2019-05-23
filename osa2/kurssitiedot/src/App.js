import React from 'react'
import Course from './Components/Course'

const App = ({ course }) => {
  const rows = () => course.map(course =>
    <Course
      course={course}      
    />
  )

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}



export default App