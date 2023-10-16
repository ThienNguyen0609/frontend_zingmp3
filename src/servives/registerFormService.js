import { ToastContainer, toast } from 'react-toastify';

const Toastify = () => {
    return (
        <ToastContainer />
    )
}

const notify = (message, typeOption) => toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: typeOption
});

const isValidInput = (obj) => {
    for (let key in obj) {
        if (!obj[key]) {
            notify(`${key} is required`, "error")
            return {isValid: true, validAttr: key};
        }
    }
    return {isValid: false, validAttr: null};;
}

const showTypeToastify = (message, messageType) => {
    notify(message, messageType)
}

export { Toastify, isValidInput, showTypeToastify }