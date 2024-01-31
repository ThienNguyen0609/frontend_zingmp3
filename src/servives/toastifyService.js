import { toast } from "react-toastify";

const notify = (message, typeOption) => toast(message, {
    position: "top-right",
    style: {
        backgroundColor: "#3A3344",
        color: "#ddd",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    },
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: typeOption
});

const showTypeToastify = (message, messageType) => {
    notify(message, messageType)
}

export { showTypeToastify }
