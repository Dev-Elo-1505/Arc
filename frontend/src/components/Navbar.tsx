import { ArrowBigRightDash, Layers, User } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()

  return (
    <nav className="bg-white flex items-center justify-between rounded-2xl pl-4 py-2 pr-2">
      <div className="flex items-center gap-2">
        <Layers
       
        className="text-primary font-medium" />
        <p className="font-semibold text-dark text-lg rounded-">Arc.io</p>
      </div>
      <div>
        <ul className="flex items-center gap-6 font-medium">
          <li className="text-primary">Home</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>About</li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Button
          text={
            <div className="flex items-center gap-1 group">
              <User size={17} className="transition-transform group-hover:-translate-y-1" /> <p>Sign In</p>
            </div>
          }
          customClass="w-auto font-light text-sm rounded-xl bg-primary-light border border-primary/50 text-primary"
          onClick={() => navigate('/auth/login')}
        />
        <Button
          text={
            <div className="flex items-center gap-1 group">
              <p>Free Sign Up</p>
              <ArrowBigRightDash size={15} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
            </div>
          }
          customClass="w-auto font-light text-sm rounded-xl bg-gradient-to-r
    from-primary via-primary to-primary/30"
    onClick={() => navigate('/auth/signup')}
        />
      </div>
    </nav>
  );
};

export default Navbar;
