const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        denyButton: 'btn btn-info'
    },
    buttonsStyling: false
});
const swalLoading = Swal.mixin({
  customClass: {
    popup: 'swal2-loading-popup',
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
  showConfirmButton: false,
  didOpen: () => {
    Swal.showLoading();
  }
});


function goMainPage() {
    sessionStorage.removeItem('WorkFlag');
    window.location.href = 'Home.html';
}

