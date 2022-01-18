import Taro from '@tarojs/taro';

const log = Taro.getRealtimeLogManager();

export default {
  info(...args: any[]) {
    const pages = Taro.getCurrentPages();
    const curePageName = pages[pages.length - 1].route;
    console.warn('realtimeLog', curePageName, args);
    return;
    if (!log) return;
    log.info(curePageName, ...args);
  },
  warn(...args) {
    const pages = Taro.getCurrentPages();
    const curePageName = pages[pages.length - 1].route;
    if (!log) return;
    log.info(curePageName, args);
  },
  error(...args) {
    const pages = Taro.getCurrentPages();
    const curePageName = pages[pages.length - 1].route;
    if (!log) return;
    log.error(curePageName, args);
  },
  setFilterMsg(msg) {
    // 只能添加一个过滤关键词
    if (!log || !log.setFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.setFilterMsg(msg);
  },
  addFilterMsg(msg) {
    // 添加多个过滤关键词
    if (!log || !log.addFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.addFilterMsg(msg);
  },
};
