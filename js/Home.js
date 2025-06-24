function onClick_AccountInfoButton() {
    sessionStorage.setItem('WorkFlag', '0');
    window.location.href = 'AccountInfo.html';
    document.getElementById('CreateAccountCard').style.display = 'block';

}