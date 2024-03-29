import { useEffect, useState } from "react";
import "../Styles/ModalTag.scss";
import cross from "../Image/cross.svg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../store/index";
import { createTag, getTags } from "../store/slices/taskThunks";
import { setTags } from "../store/slices/taskSlice";
import { getToken } from "../store/utils/storage";

function ModalTag(props: { Visible: boolean; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [tagName, setTagName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    if (tagName) {
      try {
        const token = getToken();
        if (token) {
          const response = await dispatch(
            createTag({ token, tagName })
          ).unwrap();
          if (response.Success === false && response.message) {
            return toast.error(`Ошибка добавления тега.${response.message}`);
          }
          const actionResult = await dispatch(getTags({ token })).unwrap();
          if (actionResult && actionResult.Data.length > 0) {
            dispatch(setTags(actionResult.Data));
          } else {
            console.error("Failed to load tags");
          }
          toast.success("Тег добавлен");
          setTagName("");
          setVisible(false);
          props.onClose();
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка добавления тега. Проверьте введенные данные.");
      }
    }
  };

  useEffect(() => {
    if (props.Visible) {
      setDisplay(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setTimeout(() => setDisplay(false), 300);
    }
  }, [props.Visible]);

  return (
    <>
      {display && (
        <div className={`ModalTag ${visible ? "ModalTag--visible" : ""}`}>
          <div className="ModalTag__container">
            <div className="ModalTag__container-text">
              <h1>Добавление тега</h1>
              <img
                src={cross}
                alt="Close"
                onClick={() => {
                  setVisible(false);
                  props.onClose();
                }}
              />
            </div>
            <div className="ModalTag__container-base">
              <input
                type="text"
                placeholder="Название тега"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
              <button onClick={handleSubmit}>Добавить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalTag;
