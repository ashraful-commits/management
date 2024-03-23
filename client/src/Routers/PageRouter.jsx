import { createBrowserRouter } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

const PageRouter = createBrowserRouter([...PublicRouter, ...PrivateRouter]);

export default PageRouter;
