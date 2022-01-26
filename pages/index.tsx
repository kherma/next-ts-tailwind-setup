import type { NextPage } from 'next';
import styled from 'styled-components';

const Title = styled.h1`
  background-color: pink;
  color: white;
  font-size: 3rem;
`;

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-4'>
      <h1 className='text-5xl bg-black text-white'>Hello Tailwind</h1>
      <Title>Hello Styled-component</Title>
    </div>
  );
};

export default Home;
