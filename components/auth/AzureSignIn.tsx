export const AzureSignIn = () => {
  return (
    <div className="w-full flex justify-center items-center gap-3 text-alpha-800 bg-alpha-light-100 p-4 rounded-md">
      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.966 10.966H0V0H10.966V10.966Z" fill="#F25022" />
        <path d="M23.0734 10.966H12.1074V0H23.0734V10.966Z" fill="#7FBA00" />
        <path d="M10.966 23.0732H0V12.1072H10.966V23.0732Z" fill="#00A4EF" />
        <path d="M23.0734 23.0732H12.1074V12.1072H23.0734V23.0732Z" fill="#FFB900" />
      </svg>
      <span className="leading-none text-base">Sign in with Microsoft 365</span>
    </div>
  );
};
