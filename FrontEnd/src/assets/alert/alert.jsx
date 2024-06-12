import Swal from "sweetalert2";
import "../styles/Alert.css";

const alertMsg = (content) => {
  return Swal.fire({
    html: `<div class="custom-text">${content}</div>`,
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    position: "bottom",
    customClass: {
      popup: 'custom-width',
      confirmButton: 'confirm-btn',
      cancelButton: 'cancel-btn'
    },
    buttonsStyling: false
  })
}

export default alertMsg;