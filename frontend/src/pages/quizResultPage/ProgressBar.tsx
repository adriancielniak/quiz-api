import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

// Styled-components
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
`;

const Progress = styled(animated.div)`
  height: 100%;
  border-radius: 10px;
  background-color: #007bff;
`;

// Komponent paska postępu
const ProgressBar = ({ value, max }: { value: number; max: number }) => {
  const animatedProps = useSpring({
    width: `${(value / max) * 100}%`,
    from: { width: '0%' },
  });

  return (
    <ProgressBarContainer>
      <Progress style={animatedProps} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;