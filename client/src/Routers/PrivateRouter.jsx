import Layout from "../Components/Layout";
import Company from "../Pages/Company/Company";
import CompanyView from "../Pages/Company/CompanyView";
import EmailSignature from "../Pages/EmailSignature";
import Home from "../Pages/Home/Home";
import Project from "../Pages/Project/Prjoject";
import Seller from "../Pages/Seller/Seller";
import PrivateGard from "./PrivateGard";

const PrivateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/:id",
            element: <Project />,
          },
          {
            path: "/seller/:id",
            element: <Seller />,
          },
          {
            path: "/email/:id",
            element: <EmailSignature />,
          },
          {
            path: "/company",
            element: <Company />,
          },
          {
            path: "/company/:id",
            element: <CompanyView />,
          },
        ],
      },
    ],
  },
];

export default PrivateRouter;
