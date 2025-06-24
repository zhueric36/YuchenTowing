function CancelCreateAccount() {
    document.getElementById('C_Date').value = '';
    document.getElementById('C_Time').value = '';
    document.getElementById('C_CompanyName').value = '';
    document.getElementById('C_Start').value = '';
    document.getElementById('C_Destination').value = '';
    document.getElementById('C_Money').value = '';
    document.getElementById('C_Phone').value = '';
    document.getElementById('C_CarType').value = '';
    document.getElementById('C_licenseplate').value = '';
    document.getElementById('C_CarNumber').value = '';
    document.getElementById('C_Personnel').value = '';
    document.getElementById('CreateAccountCard').style.display = '';
    goMainPage();
}

async function ConfirmAccount() {
    const date = $('#C_Date').val();
    const time = $('#C_Time').val();
    const companyName = $('#C_CompanyName').val();
    const start = $('#C_Start').val();
    const destination = $('#C_Destination').val();
    const money = $('#C_Money').val();
    const phone = $('#C_Phone').val();
    const carType = $('#C_CarType').val();
    const licenseplate = $('#C_licenseplate').val();
    const carNumber = $('#C_CarNumber').val();
    const personnel = $('#C_Personnel').val();

    if (!date || !time || !companyName || !start || !destination || !money || !phone || !carType || !licenseplate || !carNumber || !personnel) {
        swalWithBootstrapButtons.fire({
            icon: 'warning',
            title: '欄位不可為空',
        });
        return;
    }

    const data = await StartCreateAccount(date,time,companyName, start, destination, money, phone, carType, licenseplate, carNumber, personnel);

    if (data && data.state) {
        swalWithBootstrapButtons.fire({
            icon: 'success',
            title: '建立成功',
        }).then(() => {
            ClearFormFields();
            document.getElementById('CreateAccountCard').style.display = '';
        });
    } else {
        swalWithBootstrapButtons.fire({
            icon: 'error',
            title: '建立失敗',
        }).then(() => {
            ClearFormFields();
            document.getElementById('CreateAccountCard').style.display = 'none';
        });
    }
}

function ClearFormFields() {
    const fields = ['C_Date', 'C_CompanyName', 'C_Time', 'C_Start', 'C_Destination', 'C_Money', 'C_Phone', 'C_CarType', 'C_licenseplate', 'C_CarNumber', 'C_Personnel'];
    fields.forEach(id => document.getElementById(id).value = '');
}

async function StartCreateAccount(date,time ,companyName, start, destination, money, phone, carType, licenseplate, carNumber, personnel) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyEBkiZSgO0ACC6a2xOI-V_0o5mZRzksx7DftKOckrHCPOLdG6FeMZPHFCKtQwW1EKT/exec";

    try {
        const response = await fetch(`${scriptURL}?action=insert&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&companyName=${encodeURIComponent(companyName)}&start=${encodeURIComponent(start)}&destination=${encodeURIComponent(destination)}&money=${encodeURIComponent(money)}&phone=${encodeURIComponent(phone)}&carType=${encodeURIComponent(carType)}&licenseplate=${encodeURIComponent(licenseplate)}&carNumber=${encodeURIComponent(carNumber)}&personnel=${encodeURIComponent(personnel)}`);
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        swalWithBootstrapButtons.fire({
            icon: 'error',
            title: '連線錯誤',
            text: error.message || '無法連接到後端',
        });
        return { state: false };
    }
}


