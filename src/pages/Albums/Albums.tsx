// import PortfolioMobile from "./Mobile/PortfolioMobile";
// import { useContext } from "react";
// import { ScreenSizeContext } from "../../components/Layout/Layout";

import Logo from "../../components/Logo/Logo";

function Albums() {
  // const screenSize = useContext(ScreenSizeContext);

  return (
    <div>
      <Logo />
      <div>Albums</div>
    </div>
  );
}

export default Albums;

// return (
//   <>
//     {screenSize.width < 480 ? <PortfolioMobile /> : <div>Desktop comp</div>}
//   </>
// );
