const ROUTES = {
  ROOT: "ROOT",
  ABOUT: "ABOUT",
  LOGOUT: "LOGOUT",
  MY_VIDEOS: "MY_VIDEOS",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  ADMIN: "ADMIN",
  UPLOADVID: "UPLOADVID",
  CONTACT: "CONTACT",
};

const ROUTES_DEF = {
  [ROUTES.ROOT]: { to: "/", label: "Home" },
  [ROUTES.ABOUT]: { to: "/about", label: <button type="button" className="btn" >About</button> },
  [ROUTES.LOGOUT]: { to: "/logout", label: <button type="button" className="btn" >LogOut</button> },
  [ROUTES.MY_VIDEOS]: { to: "/my-videos", label: <button type="button" className="btn" >My Videos</button> },
  [ROUTES.LOGIN]: { to: "/login-form", label: <button type="button" className="btn" >Login</button> },
  [ROUTES.SIGNUP]: { to: "/signup", label: <button type="button" className="btn" >SignUp</button> },
  [ROUTES.ADMIN]: { to: "/admin-controll", label: <button type="button" className="btn" >Admin</button> },
  [ROUTES.UPLOADVID]: { to: "/video/upload", label: <button type="button" className="btn" >Upload Video</button> },
  [ROUTES.CONTACT]: { to: "/contact-page", label: <button type="button" className="btn" >Contact</button> },
};

export { ROUTES_DEF, ROUTES };
