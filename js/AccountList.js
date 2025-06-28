window.onload = function() {
  AccountList();
};

let personnelData = []; // 存所有資料
let currentPage = 1;
const pageSize = 10;
function AccountList(){
    const scriptURL = getScriptURL();

    swalLoading.fire({ 
        title:"執行中請稍後....."
    });

    fetch(`${scriptURL}?action=read`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#AccountList tbody");
            tbody.innerHTML = ""; // 清空表格

            data.forEach((row, index) => {
                if (index === 0) return; // 跳過標頭
                const converted = convertISOToLocalDateTime(row[0], row[1]); // 假設 row[0] 是日期、row[1] 是時間
                row[0] = converted.日期;
                row[1] = converted.時間;
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${index}</td>
                    <td>${row[0]}</td>  
                    <td>${row[1]}</td> 
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                    <td>${row[4]}</td>
                    <td>${row[5]}</td>
                    <td>${row[6]}</td>
                    <td>${row[7]}</td>
                    <td>${row[8]}</td>
                    <td>${row[9]}</td>
                    <td>${row[10]}</td>
                    <td>${row[11]}</td>
                    <td><button class="btn btn-danger" onclick="Delete(${index})">刪除</button></td>
                `;
                tbody.appendChild(tr);
            });

            document.getElementById("TotalCount").innerText = data.length - 1;
            swalLoading.close();
        })
        .catch(error => {
            console.error("載入資料錯誤：", error);
            swalLoading.close();
        });
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
    




