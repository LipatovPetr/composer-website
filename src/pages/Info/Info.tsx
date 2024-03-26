// import PortfolioMobile from "./Mobile/PortfolioMobile";
// import { useContext } from "react";
// import { ScreenSizeContext } from "../../components/Layout/Layout";

import Logo from "../../components/Logo/Logo";

function Info() {
  // const screenSize = useContext(ScreenSizeContext);

  return (
    <div>
      <Logo />
      <div>Info page</div>
    </div>
  );
}

export default Info;

// return (
//   <>
//     {screenSize.width < 480 ? <PortfolioMobile /> : <div>Desktop comp</div>}
//   </>
// );
