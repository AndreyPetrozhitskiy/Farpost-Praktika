import "../Styles/DropdownTags.scss";
import Arrow from "../Image/Arrow.svg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DropdownTags(props: {
  Data: string[];
  onSelectionChange: (selectedItems: string[]) => void;
  stateTags: string[] | null;
}) {
  const [check, setCheck] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (props.stateTags) {
      setSelectedItems(props.stateTags);
    }
  }, [props.stateTags]);

  const toggleDropdown = (): void => {
    setCheck(!check);
  };
  const handleSelectItem = (item: string): void => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.includes(item);
      const newSelectedItems = isAlreadySelected
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item];
      props.onSelectionChange(newSelectedItems);
      return newSelectedItems;
    });
  };
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="DropdownTags">
      <AnimatePresence>
        {!check && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="DropdownTags__start"
            variants={variants}
          >
            <p>Выбрать тэги</p>
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
            className="DropdownTags__list"
            variants={variants}
          >
            {props.Data.map((item, index) => (
              <div className="DropdownTags__list-checkbox" key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleSelectItem(item)}
                  checked={selectedItems.includes(item)}
                />
                <p>{item}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropdownTags;
