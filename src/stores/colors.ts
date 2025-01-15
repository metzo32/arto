// export const Green = "#40A93E";
// export const HoverGreen = "#276E27";
// export const Orange = "#FC6B00";
// export const Yellow = "#FE9311"
// export const Grey = "#6E6560";
// export const LightGrey = "#A8A29C";
// export const HoverGrey = "#272423";
// export const Light = "#EEEDEB";
// export const White = "#FFF";
// export const Black = "#000"

interface colorTheme {
  Green: string;
  HoverGreen: string;
  Orange: string;
  Yellow: string;
  Grey: string;
  LightGrey: string;
  HoverGrey: string;
  Light: string;
  White: string;
  Black: string;
  Overlay: string;
  OverlayGradient: string;
}

export const newTheme = {
  text: "#4A505B",
  base: "#F2F7F8",
  white: "#FFFFFF",
  outline: "#DEE1E7",
  shadow: "#BEC2C8",
}

export const lightTheme: colorTheme = {
  Green: "#40A93E",
  HoverGreen: "#276E27",
  Orange: "#FF5C00",
  Yellow: "#FE9311",
  Grey: "#6E6560",
  LightGrey: "#A8A29C",
  HoverGrey: "#272423",
  Light: "#EEEDEB",
  White: "#FFF",
  Black: "#000",
  Overlay: "rgba(0, 0, 0, 0.5)",
  OverlayGradient: "linear-gradient(180deg, rgba(238,237,235,1) 0%, rgba(238,237,235,0) 95%);",
};

export const darkTheme: colorTheme = {
  Green: "#30B62E",
  HoverGreen: "#57d355",
  Orange: "#FF5C00",
  Yellow: "#FE9311",
  Grey: "#C8C3BC",
  LightGrey: "#6E6560",
  HoverGrey: "#FFFEF0",
  Light: "#272423",
  White: "#000",
  Black: "#FFF",
  Overlay: "rgba(0, 0, 0, 0.3)",
  OverlayGradient: "linear-gradient(180deg, rgba(39,36,35,1) 0%, rgba(238,237,235,0) 95%)",
};
