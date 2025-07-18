import Svg, { Path } from 'react-native-svg';

type TaskIconProps = {
  color?: string;
};

export const TodoIcon = (props: TaskIconProps) => {
  const { color = '#000' } = props;

  return (
    <Svg
      style={{ width: '100%', height: '100%' }}
      fill={color}
      viewBox="-2 -2 24 24"
      preserveAspectRatio="xMinYMin"
    >
      <Path d="M6 0h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6zm6 9a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2h-3zm-2 4a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2h-5zm0-8a1 1 0 1 0 0 2h5a1 1 0 0 0 0-2h-5zm-4.172 5.243l-.707-.707a1 1 0 1 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.415 0l2.828-2.828A1 1 0 0 0 7.95 8.12l-2.122 2.122z" />
    </Svg>
  );
};
