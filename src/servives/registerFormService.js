import { showTypeToastify } from "./toastifyService";

const isValidInput = (obj) => {
    for (let key in obj) {
        if (!obj[key]) {
            showTypeToastify(`${key} is required`, "error")
            return {isValid: true, validAttr: key};
        }
    }
    return {isValid: false, validAttr: null};;
}

export { isValidInput }