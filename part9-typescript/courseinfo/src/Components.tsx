export const Header = ({ name }: { name: string }) => {
  return <h2>{name}</h2>;
};

export const Content = ({ parts }: { parts: Array<{ name: string; exerciseCount: number }> }) => (
  <div>
    {parts.map(({ name, exerciseCount }, index) => (
      <Part key={index} name={name} exercises={exerciseCount} />
    ))}
  </div>
);

export const Total = ({ parts }: { parts: Array<{ name: string; exerciseCount: number }> }) => {
  return (
    <p>
      <strong>Total exercises:</strong>{' '}
      {parts.map((part) => part.exerciseCount).reduce((a, b) => a + b, 0)}
    </p>
  );
};

const Part = ({ name, exercises }: { name: string; exercises: number }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};
