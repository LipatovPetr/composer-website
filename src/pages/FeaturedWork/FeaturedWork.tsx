// import PortfolioMobile from "./Mobile/PortfolioMobile";
// import { useContext } from "react";
// import { ScreenSizeContext } from "../../components/Layout/Layout";

import Logo from "../../components/Logo/Logo";

function FeaturedWork() {
  // const screenSize = useContext(ScreenSizeContext);

  return (
    <div>
      <Logo />
      <div>Featured Work page</div>
    </div>
  );
}

export default FeaturedWork;

// return (
//   <>
//     {screenSize.width < 480 ? <PortfolioMobile /> : <div>Desktop comp</div>}
//   </>
// );
