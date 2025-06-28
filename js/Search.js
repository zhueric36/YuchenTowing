// let personnelData = [];
// let currentPage = 1;
// const itemsPerPage = 10;

// function renderPage(page) {
//     const tbody = document.querySelector("#PersonnelTable tbody");
//     tbody.innerHTML = ""; // 清空表格

//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = Math.min(startIndex + itemsPerPage, personnelData.length);

//     for (let i = startIndex; i < endIndex; i++) {
//         const row = personnelData[i];
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td>${i}</td>
//             <td>${row[0]}</td>  
//             <td>${row[1]}</td> 
//             <td>${row[2]}</td>
//             <td>${row[3]}</td>
//             <td>${row[4]}</td>
//             <td>${row[5]}</td>
//             <td>${row[6]}</td>
//             <td>${row[7]}</td>
//             <td>${row[8]}</td>
//             <td>${row[9]}</td>
//             <td>${row[10]}</td>
//             <td>${row[11]}</td>
//         `;
//         tbody.appendChild(tr);
//     }

//     renderPagination();
// }
// function renderPagination() {
//     const totalPages = Math.ceil(personnelData.length / itemsPerPage);
//     const container = document.getElementById("pagination");
//     container.innerHTML = "";

//     for (let i = 1; i <= totalPages; i++) {
//         const btn = document.createElement("button");
//         btn.className = "btn btn-outline-primary m-1";
//         btn.textContent = i;
//         btn.onclick = () => {
//             currentPage = i;
//             renderPage(currentPage);
//         };
//         if (i === currentPage) {
//             btn.classList.add("active");
//         }
//         container.appendChild(btn);
//     }
// }


$(document).ready(function () {
    $('#CaseNumber').keyup(function (event) {
        if (event.which === 13) {
            SearchCaseNumber();
            
        }
    });
    $('#CompanyName').keyup(function (event) {
        if (event.which === 13) {
            SearchCompanyName();
        }
    });
    // $('#CarNumber').keyup(function (event) {
    //     if (event.which === 13) {
    //         SearchCarNumber();
           
    //     }
    // });
     $('#InputDate').keyup(function (event) {
        if (event.which === 13) {
            SearchDate();
           
        }
    });
     $('#PersonnelName').keyup(function (event) {
        if (event.which === 13) {
            SearchPersonnelName();
           
        }
    });

});

function Canecl() {
    document.getElementById('Content').style.display = 'block';
    document.getElementById('CaseTable').style.display = 'none';
    document.getElementById('CaseNumberCard').style.display = 'none';
    document.getElementById('CompanyCard').style.display = 'none';
    document.getElementById('CompanyTable').style.display = 'none';
    document.getElementById('DateCard').style.display = 'none';
    document.getElementById('DateTable').style.display = 'none';
    // document.getElementById('CarTable').style.display = 'none';
    document.getElementById('PersonnelCard').style.display = 'none';
    document.getElementById('PersonnelTable').style.display = 'none';
    
}
function  Open_CompanyName(){
    document.getElementById('Content').style.display = 'none';
    document.getElementById('CompanyCard').style.display = '';
   
 
}
function  Open_CaseNumber() {
    document.getElementById('Content').style.display = 'none';
    document.getElementById('CaseNumberCard').style.display = '';
   
}
function Open_Date(){
    document.getElementById('Content').style.display = 'none';
    document.getElementById('DateCard').style.display = '';
   
}

// function  Open_Car() {
//     document.getElementById('Content').style.display = 'none';
//     document.getElementById('CarNumberCard').style.display = '';
   
// }
function  Open_Personnel() {
    document.getElementById('Content').style.display = 'none';
    document.getElementById('PersonnelCard').style.display = '';
   
}


function SearchCaseNumber() {
    var CaseNumber = $('#CaseNumber').val();
    SearchCase(CaseNumber);
    document.getElementById('CaseNumber').value = '';
    $('#newtr').remove();
   
}
function SearchCompanyName() {
    var CompanyName = $('#CompanyName').val();
    SearchCompany(CompanyName);
    document.getElementById('CompanyName').value = '';
    $('#newtr').remove();
   
}
function SearchDate() {
    var dateInput = $('#InputDate').val(); // 例如 "2025-06-28"
    const dateParts = dateInput.split('-'); // ['2025', '06', '28']
    const sheetDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]).toString();

    SearchCaseDate(sheetDate);

    $('#InputDate').val('');
    $('#newtr').remove();
}



// function SearchCarNumber() {
//     var CarNumber = $('#CarNumber').val();
//     SerachCarNumber(CarNumber);
//     document.getElementById('CarNumber').value = '';
//     $('#newtr').remove();
   
// }
function SearchPersonnelName() {
    var PersonnelName = $('#PersonnelName').val();
    SerachPersonnel(PersonnelName);
    document.getElementById('PersonnelName').value = '';
    $('#newtr').remove();
   
}
function fetchAndRenderData({ 
    
    apiAction, 
    queryParamName, 
    queryValue, 
    hideCardId, 
    showTableId, 
    tableBodySelector, 
    totalCountId 
}) {
    if (!queryValue) {
        swalWithBootstrapButtons.fire({
            icon: 'warning',
            title: '欄位不可為空',
        });
        return;
    }
    document.querySelector(tableBodySelector).innerHTML = '';
    const scriptURL = getScriptURL();
    const finalURL = `${scriptURL}?action=${apiAction}&${queryParamName}=${encodeURIComponent(queryValue)}`;

    document.getElementById(hideCardId).style.display = 'none';
    document.getElementById(showTableId).style.display = 'block';

    swalLoading.fire({ title: "執行中請稍後....." });

    fetch(finalURL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector(tableBodySelector);
            tbody.innerHTML = "";

            // 👉 查無資料時的處理
            if (!data || data.length <= 1) {
                swalLoading.close();
                swalWithBootstrapButtons.fire({
                    icon: 'info',
                    title: '查無資料',
                    text: '請確認輸入的查詢條件是否正確',
                });

                // 隱藏表格區塊（你可以依需求保留或刪掉這行）
                
                document.getElementById(showTableId).style.display = 'none';
                document.getElementById(hideCardId).style.display = 'block';
                return;
            }

            data.forEach((row, index) => {
                if (index === 0) return; // skip headers
                const converted = convertISOToLocalDateTime(row[0], row[1]);
                row[0] = converted.日期;
                row[1] = converted.時間;

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${index}</td>
                    ${row.map((col, i) => {
                        if (i === row.length - 1) return ""; 
                        return `<td>${col}</td>`;
                    }).join('')}
                `;

                tbody.appendChild(tr);
            });

            document.getElementById(totalCountId).innerText = data.length - 1;
            swalLoading.close();
        })
        .catch(error => {
            console.error("載入資料錯誤：", error);
            swalLoading.close();
            swalWithBootstrapButtons.fire({
                icon: 'error',
                title: '載入錯誤',
                text: '請稍後再試或聯絡系統管理員'
            });
        });
}




//案件

function SearchCase(CaseNumber) {
    fetchAndRenderData({
        apiAction: 'searchcasenumber',
        queryParamName: 'caseNumber',
        queryValue: CaseNumber,
        hideCardId: 'CaseNumberCard',
        showTableId: 'CaseTable',
        tableBodySelector: '#CasenumberTable tbody',
        totalCountId: 'CaseTotalCount'
    });
}



//公司
function SearchCompany(CompanyName) {
    fetchAndRenderData({
        apiAction: 'searchcompanyname',
        queryParamName: 'companyName',
        queryValue: CompanyName,
        hideCardId: 'CompanyCard',
        showTableId: 'CompanyTable',
        tableBodySelector: '#CompanyNameTable tbody',
        totalCountId: 'CompanyTotalCount'
    });
}
//出車
// function SerachCarNumber(CarNumber){
//     document.getElementById('CarNumberCard').style.display = 'none';
//     document.getElementById("CarTable").style.display = "block";
//     const scriptURL = getScriptURL();
//     if (!CarNumber) {
//         swalWithBootstrapButtons.fire({
//             icon: 'warning',
//             title: '欄位不可為空',
//         });       
//         return;
//     }
//     swalLoading.fire({ 
//         title:"執行中請稍後....."
//     });
   
//     fetch(`${scriptURL}?action=serachcarnumber&carNumber=${encodeURIComponent(CarNumber)}`)
//     .then(response => response.json())
//     .then(data => {
//             const tbody = document.querySelector("#CarTable tbody");
//             tbody.innerHTML = ""; // 清空表格
//             data.forEach((row, index) => {
//                 if (index === 0) return; // 跳過標頭
//                 const converted = convertISOToLocalDateTime(row[0], row[1]); // 假設 row[0] 是日期、row[1] 是時間
//                 row[0] = converted.日期;
//                 row[1] = converted.時間;
//                 const tr = document.createElement("tr");
//                 tr.innerHTML = `
//                     <td>${index}</td>
//                     <td>${row[0]}</td>  
//                     <td>${row[1]}</td> 
//                     <td>${row[2]}</td>
//                     <td>${row[3]}</td>
//                     <td>${row[4]}</td>
//                     <td>${row[5]}</td>
//                     <td>${row[6]}</td>
//                     <td>${row[7]}</td>
//                     <td>${row[8]}</td>
//                     <td>${row[9]}</td>
//                     <td>${row[10]}</td>
//                     <td>${row[11]}</td>
                    
//                 `;
//                 tbody.appendChild(tr);
//             });
             
//             document.getElementById("CarTotalCount").innerText = data.length - 1;
//             swalLoading.close();
//         })
//         .catch(error => {
//             console.error("載入資料錯誤：", error);
//             swalLoading.close();
//         });
// }

//日期
function SearchCaseDate(sheetDate) {
   
    fetchAndRenderData({
        apiAction: 'searchdate',
        queryParamName: 'date',
        queryValue: sheetDate,
        hideCardId: 'DateCard',
        showTableId: 'DateTable',
        tableBodySelector: '#DateCaseTable tbody',
        totalCountId: 'DateCaseTotalCount'
    });
}

//人員

function SerachPersonnel(PersonnelName) {
    fetchAndRenderData({
        apiAction: 'searchpersonnelname',
        queryParamName: 'personnelName',
        queryValue: PersonnelName,
        hideCardId: 'PersonnelCard',
        showTableId: 'PersonnelTable',
        tableBodySelector: '#PersonnelTable tbody',
        totalCountId: 'PersonnelTotalCount'
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