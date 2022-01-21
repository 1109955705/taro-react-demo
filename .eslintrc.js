module.exports = {
  extends: ['taro/react', 'plugin:prettier/recommended',],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // console提示
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debug提示
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
