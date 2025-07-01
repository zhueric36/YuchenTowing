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

function renderTableWithPagination(data, tableBodySelector, paginationId, rowsPerPage, renderRowFunction) {
    const totalPages = Math.ceil(data.length / rowsPerPage) || 1; // 保底至少 1 頁
    let currentPage = 1;

    function displayPage(page) {
        const tbody = document.querySelector(tableBodySelector);
        if (!tbody) return;

        tbody.innerHTML = ''; // 清空表格
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = data.slice(start, end);

        pageData.forEach((row, index) => {
            renderRowFunction(row, start + index + 1, tbody);
        });

        renderCustomPagination(paginationId, totalPages, page, newPage => {
            currentPage = newPage;
            displayPage(currentPage);
        });
    }

    displayPage(currentPage);
}


function renderCustomPagination(paginationId, totalPages, currentPage, onPageChange) {
    const container = document.getElementById(paginationId);
    if (!container) return;

    container.innerHTML = ''; // 清除舊的分頁按鈕

    const createButton = (text, disabled, onClick) => {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.disabled = disabled;
        btn.className = disabled ? 'btn btn-secondary' : 'btn btn-outline-secondary';
        btn.style.margin = '0 4px';
        if (!disabled) {
            btn.addEventListener('click', onClick);
        }
        return btn;
    };

    container.appendChild(createButton('上一頁', currentPage === 1, () => onPageChange(currentPage - 1)));

    // ➕ 加入頁碼輸入框
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = totalPages;
    input.value = currentPage;
    input.style.width = '50px';
    input.style.margin = '0 4px';
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            let page = parseInt(input.value, 10);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                onPageChange(page);
            } else {
                input.value = currentPage; // 無效輸入回復原頁
            }
        }
    });

    const slashSpan = document.createElement('span');
    slashSpan.innerHTML = `&nbsp;/&nbsp;${totalPages}&nbsp;`;

    container.appendChild(input);
    container.appendChild(slashSpan);

    container.appendChild(createButton('下一頁', currentPage === totalPages, () => onPageChange(currentPage + 1)));
    container.appendChild(createButton('最後一頁', currentPage === totalPages, () => onPageChange(totalPages)));
}


// function renderPagination(containerId, totalPages, onPageChange) {
//     let currentPage = 1;
//     const container = document.getElementById(containerId);
//     container.innerHTML = "";

//     const btnPrev = document.createElement("button");
//     btnPrev.innerText = "上一頁";
//     btnPrev.onclick = () => {
//         if (currentPage > 1) {
//             currentPage--;
//             update();
//         }
//     };

//     const input = document.createElement("input");
//     input.type = "number";
//     input.min = 1;
//     input.max = totalPages;
//     input.value = currentPage;
//     input.style.width = "50px";
//     input.style.textAlign = "center";

//     input.addEventListener("change", () => {
//         const val = parseInt(input.value);
//         if (!isNaN(val) && val >= 1 && val <= totalPages) {
//             currentPage = val;
//             update();
//         } else {
//             input.value = currentPage; // 還原
//         }
//     });

//     const pageTotal = document.createElement("span");
//     pageTotal.innerText = ` / ${totalPages}`;

//     const btnNext = document.createElement("button");
//     btnNext.innerText = "下一頁";
//     btnNext.onclick = () => {
//         if (currentPage < totalPages) {
//             currentPage++;
//             update();
//         }
//     };

//     const btnLast = document.createElement("button");
//     btnLast.innerText = "最後一頁";
//     btnLast.onclick = () => {
//         currentPage = totalPages;
//         update();
//     };

//     container.appendChild(btnPrev);
//     container.appendChild(input);
//     container.appendChild(pageTotal);
//     container.appendChild(btnNext);
//     container.appendChild(btnLast);

//     function update() {
//         input.value = currentPage;
//         onPageChange(currentPage); // 呼叫回調
//     }

//     update(); // 初始化
// }





