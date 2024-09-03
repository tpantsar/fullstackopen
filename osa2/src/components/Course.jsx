/* eslint-disable react/prop-types */
const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <strong>Total exercises:</strong>{" "}
      {parts.map((part) => part.exercises).reduce((a, b) => a + b)}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <hr />
    </>
  );
};

export default Course;
