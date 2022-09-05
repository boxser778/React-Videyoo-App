import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { BiVideoPlus } from "@react-icons/all-files/bi/BiVideoPlus";
import { IoMdInformationCircle } from "@react-icons/all-files/io/IoMdInformationCircle";
import { FcVideoFile } from "@react-icons/all-files/fc/FcVideoFile";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { GrUserAdmin } from "@react-icons/all-files/gr/GrUserAdmin";
import { AiOutlineLogin } from "@react-icons/all-files/ai/AiOutlineLogin";
import { HiOutlineUserAdd } from "@react-icons/all-files/hi/HiOutlineUserAdd";
import "./NavBar.scss";

const PhoneNavBar = ({ user }) => {
  return (
    <nav className="phoneNavBar">
      <div className="container">
        <a href="/">
          <AiFillHome className="icon" />
        </a>
        <a href="/about">
          <IoMdInformationCircle className="icon" />
        </a>
        {user && (
          <a href="/my-videos">
            <FcVideoFile className="icon" />
          </a>
        )}
        {user && (
          <a href="/video/upload">
            <BiVideoPlus className="icon" />
          </a>
        )}

        {!user && (
          <a href="/login">
            <AiOutlineLogin className="icon" />
          </a>
        )}
        {!user && (
          <a href="/signup">
            <HiOutlineUserAdd className="icon" />
          </a>
        )}
        {user && user.isAdmin && (
          <a href="/admin-controll">
            <GrUserAdmin className="icon" />
          </a>
        )}

        {user && (
          <a href="/logout">
            <AiOutlineLogout className="icon" />
          </a>
        )}
      </div>
    </nav>
  );
};

export default PhoneNavBar;
