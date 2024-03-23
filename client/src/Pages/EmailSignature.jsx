import { useSelector } from "react-redux";
import { getAllSellerState } from "../Features/Seller/SellerSlice";
import { Link } from "react-router-dom";

const EmailSignature = () => {
  const { loginInSeller } = useSelector(getAllSellerState);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen min-h-screen bg-primary  bg-opacity-20 flex justify-center items-center z-[9999999999999]">
      <div className="min-w-[1440px] relative flex justify-center items-center bg-gray-100 min-h-[909px] rounded-2xl">
        <div className="text-white w-[500px] h-[200px] text-center flex justify-center items-center  p-2 bg-white bg-opacity-90 rounded-md">
          <Link
            to={`/`}
            className="absolute p-2 transition-all duration-500 ease-in-out bg-white rounded-full top-5 left-4 hover:bg-gray-400"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>

              <g data-name="arrow left" id="arrow_left">
                <path
                  className="cls-1"
                  d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"
                />
              </g>
            </svg>
          </Link>
          <div className="flex items-center justify-center w-full h-full gap-2">
            <div className="flex justify-center items-center bg-primary  h-full w-[180px]">
              {loginInSeller.avatar ? (
                <img
                  className="w-[100px] h-[100px] shrink-0 rounded-full"
                  src={loginInSeller?.avatar}
                />
              ) : (
                <img
                  className="w-[100px] shrink-0 h-[100px] rounded-full"
                  src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1700006400&semt=sph"
                />
              )}
            </div>
            <div className="flex flex-col items-start w-full h-full p-2 border border-cyan-300">
              <p className=" text-cyan-700  capitalize font-['work_sans'] text-3xl  leading-3 mt-3 font-[600]">
                {loginInSeller?.name}
              </p>
              <p className=" text-gray-500 py-1 capitalize  font-['work_sans'] text-2xl  font-[400]">
                {loginInSeller?.employment}
              </p>

              <hr className="bg-primary  my-2 h-[2px] w-full" />

              <p className=" text-gray-600 flex justify-center items-center gap-2 font-['work_sans']">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    id="company-small-24px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#057386"
                  >
                    <path
                      id="company-small-24px-2"
                      data-name="company-small-24px"
                      d="M16,4H2A2.006,2.006,0,0,0,0,6V24H18V6A2.006,2.006,0,0,0,16,4ZM8,22V18h2v4Zm8,0H12V17a.945.945,0,0,0-1-1H7a.945.945,0,0,0-1,1v5H2V6H16ZM8,10H6V8H8Zm4,0H10V8h2ZM8,14H6V12H8Zm4,0H10V12h2Z"
                      transform="translate(3 -2)"
                    />
                    <rect
                      id="Retângulo_222"
                      data-name="Retângulo 222"
                      width="24"
                      height="24"
                      fill="none"
                      opacity="0"
                    />
                  </svg>
                </span>
                {loginInSeller?.companyName}
              </p>
              <p className=" text-gray-600 flex justify-center items-center gap-2 font-['work_sans']">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 52 52"
                    enableBackground="new 0 0 52 52"
                    xmlSpace="preserve"
                    fill="#057386"
                  >
                    <g>
                      <path
                        d="M24.9,30.1c0.6,0.6,1.5,0.6,2.1,0l22.6-21C50,8.3,49.9,7,48.3,7L3.6,7.1c-1.2,0-2.2,1.1-1.3,2.1L24.9,30.1z
		"
                      />
                      <path
                        d="M50,17.3c0-1-1.2-1.6-2-0.9L30.3,32.7c-1.2,1.1-2.7,1.7-4.3,1.7s-3.1-0.6-4.3-1.6L4.1,16.4
		c-0.8-0.7-2-0.2-2,0.9C2,17,2,40,2,40c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4C50,34,50,21.8,50,17.3z"
                      />
                    </g>
                  </svg>
                </span>{" "}
                {loginInSeller?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSignature;
