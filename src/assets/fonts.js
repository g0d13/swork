import RobotoRegularFont from "./fonts/Roboto-Regular.woff";
import RobotoMediumFont from "./fonts/Roboto-Medium.woff";
import RobotoBoldFont from "./fonts/Roboto-Bold.woff";

const RobotoRegular = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
      local('Roboto'),
      local('Roboto-Regular'),
      url(${RobotoRegularFont}) format('woff')
    `,
};

const RobotoMedium = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 500,
  src: `
        local('Roboto'),
        local('Roboto-Medium'),
        url(${RobotoMediumFont}) format('woff')
      `,
};

const RobotoBold = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 700,
  src: `
      local('Roboto'),
      local('Roboto-Bold'),
      url(${RobotoBoldFont}) format('woff')
    `,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  RobotoRegular,
  RobotoMedium,
  RobotoBold,
};
