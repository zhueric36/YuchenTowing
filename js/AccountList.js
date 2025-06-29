window.onload = function() {
  AccountList();
};

// let personnelData = []; // 存所有資料
// let currentPage = 1;
// const pageSize = 10;
function AccountList() {
    const scriptURL = getScriptURL();

    swalLoading.fire({ title: "執行中請稍後....." });

    fetch(`${scriptURL}?action=read`)
        .then(response => response.json())
        .then(data => {
            const tableData = data.slice(1); // 移除標頭
            renderTableWithPagination(tableData, "#AccountList tbody", "pagination-list", 10, renderAccountRow);
            document.getElementById("TotalCount").innerText = tableData.length;
            
            swalLoading.close();
        })
        .catch(error => {
            console.error("載入資料錯誤：", error);
            swalLoading.close();
        });
}

function renderAccountRow(row, index, tbody) {
    if (index === 0) return;

    const tr = document.createElement("tr");

    // 轉換時間（只在顯示時處理，不修改原始資料）
    const converted = convertISOToLocalDateTime(row[0], row[1]);

    tr.innerHTML = `
        <td>${index}</td>
        <td>${converted.日期}</td>
        <td>${converted.時間}</td>
        ${row.slice(2, row.length - 1).map(col => `<td>${col}</td>`).join('')}
        <td><button class="btn btn-danger" onclick="Delete(${index})">刪除</button></td>
    `;

    tbody.appendChild(tr);
}




function convertISOToLocalDateTime(isoDateStr, isoTimeStr) {
    const date = new Date(isoDateStr);
    const dateStr = date.toLocaleDateString('zh-TW', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        timeZone: 'Asia/Taipei'
    }).replaceAll('/', '-');

    const time = new Date(isoTimeStr);
    const timeStr = time.toLocaleTimeString('zh-TW', {
        hour: '2-digit', minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Taipei'
    });

    return { 日期: dateStr, 時間: timeStr };
}

async function Cfirmed_Delete(index){
    const scriptURL = getScriptURL();
     try {
        const response = await fetch(`${scriptURL}?action=delete&index=${encodeURIComponent(index)}`);
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

function close_List() {
    document.getElementById('AccountListCard').style.display = 'none';
    // document.querySelector(tableBodySelector).innerHTML = '';
    // document.getElementById(paginationId).innerHTML = '';
    goMainPage();
}

function Delete(index) {
    swalWithBootstrapButtons.fire({
        title: '確定刪除?',        
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: '返回',
        confirmButtonText: '刪除'
    }).then(async function (result) {
    if (result.isConfirmed) {
        const data = await Cfirmed_Delete(index);
        if (data && data.state) {
            swalWithBootstrapButtons.fire({
                title: '刪除成功'
            }).then(() => {
                AccountList();
            });
            } else {
                swalWithBootstrapButtons.fire({
                    title: '後端程式出現問題',
                    text: '請通知開發人員維護，錯誤代碼：EXEC03_MSG_ERROR'
            });
            }
    } else {
            swalWithBootstrapButtons.fire({
            title: '已取消刪除'
            });
        }
    });

} 
    




