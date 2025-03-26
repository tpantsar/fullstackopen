import { CoursePart } from './types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const Header = ({ name }: { name: string }) => {
  return <h2>{name}</h2>;
};

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => {
        console.log(part);
        const { name, exerciseCount } = part;
        switch (part.kind) {
          case 'basic':
            return <Part key={name} name={name} exercises={exerciseCount} />;
          case 'group':
            return <Part key={name} name={name} exercises={exerciseCount} />;
          case 'background':
            return <Part key={name} name={name} exercises={exerciseCount} />;
          case 'special':
            return <Part key={name} name={name} exercises={exerciseCount} />;
          default:
            return assertNever(part);
        }
      })}
    </>
  );
};

export const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      <strong>Total exercises:</strong>{' '}
      {courseParts.map((part) => part.exerciseCount).reduce((a, b) => a + b, 0)}
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
