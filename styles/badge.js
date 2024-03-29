import colors from "./colors";
import theme from "./theme";

export const baseStyles = `
  font-family: "Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  border-radius: 24px;
  height: 18px;
  padding-left: 6px;
  padding-right: 6px;
  text-transform: uppercase;
  border: 1px solid;
  letter-spacing: 0.4px;
`;

export const VariantTypes = {
    LightGray: "lightGray",
    DarkGray: "darkGray",
    Red: "red",
    Yellow: "yellow",
    Blue: "blue",
    Green: "green",
};

export const variants = {
    [theme.Dark]: {
        [VariantTypes.LightGray]: `
            background-color: ${colors.gray.dark1};
            border-color: ${colors.gray.base};
            color: ${colors.gray.light3};
        `,
        [VariantTypes.DarkGray]: `
            background-color: ${colors.gray.dark3};
            border-color: ${colors.gray.dark2};
            color: ${colors.gray.light2};
        `,
        [VariantTypes.Red]: `
            background-color: ${colors.red.dark3};
            border-color: ${colors.red.dark2};
            color: ${colors.red.light2};
        `,
        [VariantTypes.Yellow]: `
            background-color: ${colors.yellow.dark3};
            border-color: ${colors.yellow.dark2};
            color: ${colors.yellow.light2};
        `,
        [VariantTypes.Blue]: `
            background-color: ${colors.blue.dark2};
            border-color: ${colors.blue.dark1};
            color: ${colors.blue.light2};
        `,
        [VariantTypes.Green]: `
            background-color: ${colors.green.dark3};
            border-color: ${colors.green.dark2};
            color: ${colors.green.light1};
        `,
    },
    [theme.Light]: {
        [VariantTypes.LightGray]: `
            background-color: ${colors.gray.light3};
            border-color: ${colors.gray.light2};
            color: ${colors.gray.dark1};
        `,
        [VariantTypes.DarkGray]: `
            background-color: ${colors.gray.dark2};
            border-color: ${colors.gray.dark3};
            color: ${colors.white};
        `,
        [VariantTypes.Red]: `
            background-color: ${colors.red.light3};
            border-color: ${colors.red.light2};
            color: ${colors.red.dark2};
        `,
        [VariantTypes.Yellow]: `
            background-color: ${colors.yellow.light3};
            border-color: ${colors.yellow.light2};
            color: ${colors.yellow.dark2};
        `,
        [VariantTypes.Blue]: `
            background-color: ${colors.blue.light3};
            border-color: ${colors.blue.light2};
            color: ${colors.blue.dark1};
        `,
        [VariantTypes.Green]: `
            background-color: ${colors.green.light3};
            border-color: ${colors.green.light2};
            color: ${colors.green.dark2};
        `,
    },
};
