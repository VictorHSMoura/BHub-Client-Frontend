import Swal from "sweetalert2";

const defaultFailAlert = () => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'An error occurred! Please try again in a few minutes...',
    footer: '<a href="">Why do I have this issue?</a>'
});

const failAlertWithErrors = (errors: string[]) => Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: "Bad Request",
    text: errors.join("\n"),
    showConfirmButton: false,
    timer: 2500
});

const defaultSuccessAlert = (text: string) => Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 1500
});

export {
    defaultFailAlert,
    defaultSuccessAlert,
    failAlertWithErrors
}