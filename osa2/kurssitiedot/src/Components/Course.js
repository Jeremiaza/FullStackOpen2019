import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((x) =>{
              return (
                <div>
                  <li>{x.name} {x.exercises}</li>
                </div>
              )
            })}
            <div><b>yhteensä {Total(course)} tehtävää</b></div>
        </div>
    )
  }
  const Total = (props) => {
    const reducer = (accumulator, currentValue) => {
        return (
            accumulator + currentValue.exercises
        )
        }        
    return (
        props.parts.reduce(reducer, 0)
    )
}

export default Course