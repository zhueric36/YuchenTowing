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
    window.location.href = 'Home.html';
}

function goListPage() {
    // document.getElementById('AccountListCard').style.display = 'block';
    window.location.href = 'List.html';
   
}

function goCreateAccount() {
    window.location.href = 'AccountInfo.html';
    document.getElementById('CreateAccountCard').style.display = 'block';

}

function goSearchPage() {
    window.location.href = 'Search.html';
}


