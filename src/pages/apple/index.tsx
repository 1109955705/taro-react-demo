import { View, Button } from '@tarojs/components';
import { useEffect, useRef, useState } from 'react';
import style from './index.module.css';

interface PropsTypes {
  a?: string;
  b?: string;
}

const Apple = (props: PropsTypes) => {
  useEffect(() => {
    console.log('初始化', state);
    return () => {
      console.log('卸载了', state);
    };
  }, [props.a]);

  const [state, setState] = useState(1);
  const ref = useRef(1);

  const change = () => {
    setTimeout(() => {
      ref.current += 1;
    }, 3000);
  };

  const change1 = () => {
    ref.current = 5;
  };

  useEffect(() => {
    console.log('改变了', state);
  }, [state]);

  return (
    <View className={style.main}>
      Apple
      <View className="title">Apple</View>
      <Button onClick={change}>{ref.current}</Button>
      <Button onClick={change1}>{ref.current}</Button>
    </View>
  );
};

export default Apple;
