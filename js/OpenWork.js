const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        denyButton: 'btn btn-info'
    },
    buttonsStyling: false
});
function goMainPage() {
    sessionStorage.removeItem('WorkFlag');
    window.location.href = 'Home.html';
}