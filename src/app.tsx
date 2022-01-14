import { View } from "@tarojs/components";
import { createContext } from "react";
import globalContext from '@/src/hooks/global-context';
import "./app.css";

console.log('xxxxx', globalContext)
interface AppTypes {
  children: React.ReactNode;
}

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = createContext(themes.light);

const App = ({ children }: AppTypes) => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <View>{children}</View>
    </ThemeContext.Provider>
  );
};

export default App;
