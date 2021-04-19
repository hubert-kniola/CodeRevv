/// <reference types="react-scripts" />
import 'styled-components';

type Colors = {
  background: string;
  lighterBackgound: string;
  alphabg: string;
  setting: string;
  primary: string;
  secondary: string;
  text: string;
  error: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: Colors;
    background: string;
  }
}