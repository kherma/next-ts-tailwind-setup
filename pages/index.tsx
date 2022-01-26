import type { NextPage } from 'next';
import tw, { styled } from 'twin.macro';

const StyledTitle = styled.h1`
  color: red;
  background-color: blue;
  font-size: 3rem;
  padding: 0;
`;

const TailwindStylesTitle = tw.h1`
  bg-green-500 text-yellow-500 text-5xl
`;

const ConditionalTW = styled.div<{ isRed: boolean }>`
  ${tw`text-white
    font-bold
    py-2
    px-4
    border
    border-black
    rounded`}
  ${({ isRed }) =>
    isRed
      ? tw`bg-red-500 hover:bg-red-700`
      : tw`bg-blue-500 hover:bg-blue-500`};
`;

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-4'>
      <h1 className='text-5xl bg-black text-white'>Hello Tailwind</h1>
      <StyledTitle>Hello Styled-component</StyledTitle>
      <TailwindStylesTitle>Hello Twin Macro</TailwindStylesTitle>
      <ConditionalTW isRed={true}>Conticional TW</ConditionalTW>
    </div>
  );
};

export default Home;
