import Taro, { eventCenter, useDidShow } from '@tarojs/taro';
import { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import globalContext from '@/src/hooks/global-context';
import { sendHttpRequest, UserLoginApiDto } from '@/src/utils/request';
import IndexTest from './index-test';
import logo from './hook.png';
import style from './index.module.css';

const Index = () => {
  const [test, setTest] = useState({
    a: 'apple',
    b: 'banner',
  });
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: 'Taro Hooks' });
  const [show] = useModal({
    title: 'Taro Hooks!',
    showCancel: false,
    confirmColor: '#8c2de9',
    confirmText: '支持一下',
    mask: true,
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: '不如给一个star⭐️!' }).then(() => {
      showToast({ title: '点击了支持!' });
    });
  }, [show, showToast]);
  const theme = useContext(globalContext);

  const jumpTo = () => {
    Taro.navigateTo({
      url: '/pages/apple/index',
    });
  };
  // useDidShow(() => {
  //   console.log('componentDidShow');
  // });
  // const test = () => {
  //   const pages = Taro.getCurrentPages();
  //   const instance = Taro.getCurrentInstance();
  //   // const res = sendHttpRequest(UserLoginApiDto, {appid: '123456', iv: '123'});
  //   // console.log('test:result', res);
  //   console.log('test:result', pages[0], pages[0].onshow);
  //   console.log('test:result', instance);
  // };

  const change = () => {
    console.log('before', test);
    setTest({
      ...test,
      a: '2',
    });
    console.log('after', test);
  };
  // test()

  return (
    <View className={style.wrapper}>
      <Image className={style.logo} src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks! 并结合ahook适配Taro!
      </Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button className="button" onClick={() => setTitle('Taro Hooks Nice!')}>
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>
      <Button className="button" onClick={jumpTo}>
        jumpTo
      </Button>
      <Button className="button" onClick={change}>
        test
      </Button>
      <IndexTest {...test} />
    </View>
  );
};

export default Index;
