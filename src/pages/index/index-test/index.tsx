import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import style from './index.module.css';

interface PropsTypes {
  a: string;
  b: string;
}

const IndexTest = (props: PropsTypes) => {
  const { a, b } = props;
  const [state, setState] = useState(false);
  useEffect(() => {
    console.log('初始化', state);
    return () => {
      console.log('卸载了', state);
    };
  }, [a]);

  const test = () => {
    console.log('xxxx');
    setState(true);
  };
  return (
    <View className={style.main}>
      Apple
      <View className="title" onClick={test}>
        {props.a}
      </View>
    </View>
  );
};

export default IndexTest;
