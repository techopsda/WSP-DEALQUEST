export interface Props {}

export const GradientBackground: React.FC<Props> = ({}) => {
  return (
    <>
      <svg
        className="fixed w-[150vw] h-[150vh] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none bg-gradient-to-br from-alpha to alpha-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <path fill="url(#dq-gradient)" d="M0 0h1920v1080H0z" />
        <defs>
          <radialGradient
            id="dq-gradient"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(959.99644 539.99902 -782.95813 1391.92293 960 540)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".313" stopColor="#222430" />
            <stop offset="1" stopColor="#1A1A1A" />
          </radialGradient>
        </defs>
      </svg>
      {/* <div className="[ //dq-gradient ] bg-gradient-to-br from-transparent to-alpha fixed w-[150%] h-[150%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div> */}
    </>
  );
};

export default GradientBackground;
