import { createContext } from "react";

const PopupContext = createContext({
    openPopup: () => {},
    closePopup: () => {},
    isOpen: false
});

export default PopupContext;