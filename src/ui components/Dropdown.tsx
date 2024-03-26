import "../Styles/Dropdown.scss";
import Arrow from "../Image/Arrow.svg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Dropdown1(props: { Data: string[] }) {
  const [choice, setChoice] = useState("");
  const [check, setCheck] = useState(false);

  const choiceDrop = (item: string): void => {
    setChoice(item);
    setCheck(!check);
  };
  useEffect(() => {
    console.log(choice);
  }, [choice]); 
  const toggleDropdown = (): void => {
    setCheck(!check);
  };
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="Dropdown1">
      <AnimatePresence>
        {!check && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }} 
            className="Dropdown1__start"
            variants={variants} 
          >
            <p>{choice}</p>

            <img
              src={Arrow}
              alt="Toggle Dropdown"
              onClick={toggleDropdown}
              aria-expanded={check}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {check && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }} 
            className="Dropdown1__list"
            variants={variants} 
          >
            {props.Data.map((item, itemIndex) => (
              <p key={itemIndex} onClick={() => choiceDrop(item)}>
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown1;