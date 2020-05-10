import React, { useState } from 'react';
import styled from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill';
import { InView } from 'react-intersection-observer';
import Reset from '../utils/reset';

const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 100px;
  background-color: rgba(46, 69, 192, 0.5);
`;

const Container = styled.main`
  overflow-y: scroll;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

const FullViewport = styled.section`
  width: 100vw;
  height: 100vh;
  border: 1px solid purple;
  padding: 150px;
  background: linear-gradient(#cf64a7, #1c4680);
  scroll-snap-align: start;
`;

const NavItem = styled.a`
  display: block;
  padding: 20px;
  background-position: bottom left;
  background-size: 0 5px;
  color: ${({
    currentIndex,
    index,
  }) => (currentIndex === index ? 'pink' : 'purple')};
  transition: color 0.4s, background-size 0.4s;

  &:hover {
    background-image: linear-gradient(#000, #000);
    background-size: 100% 5px;
    background-repeat: no-repeat;
  }
`;

const Homepage = () => {
  smoothscroll.polyfill();

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(window.location.hash.split('section-')[1] || null);

  const items = [
    {
      title: 'foo',
    },
    {
      title: 'bar',
    },
    {
      title: 'baz',
    },
    {
      title: 'foobar',
    },
  ];

  return (
    <Container>
      <Reset />
      <Header>
        {items.map(({ title }, index) => (
          <NavItem
            currentIndex={currentIndex}
            href={`#section-${index}`}
            index={index}
            key={title}
          >
            {title || 'no title'}
          </NavItem>
        ))}
      </Header>
      {items.map(({ title }, index) => (
        <InView
          key={title}
          onChange={(inView) => inView && setCurrentIndex(index)}
          rootMargin="-200px"
        >
          {({ ref }) => (
            <FullViewport
              id={`section-${index}`}
              ref={ref}
            >
              {title || 'no title'}
            </FullViewport>
          )}
        </InView>
      ))}
    </Container>
  );
};

export default Homepage;
