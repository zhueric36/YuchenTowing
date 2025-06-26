
  
   
    // function loadData() {
    //   fetch(`${scriptURL}?action=read`)
    //     .then(response => response.json())
    //     .then(data => {
    //       const tbody = document.querySelector("#dataTable tbody");
    //       tbody.innerHTML = ""; // 清空表格
    //       data.forEach((row, index) => {
    //         if (index === 0) return; // 跳過標頭
    //         const tr = document.createElement("tr");
    //         tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td>`;
    //         tbody.appendChild(tr);
    //       });
    //     })
    //     .catch(error => console.error("載入資料錯誤：", error));
    // }

    // // 頁面載入時讀取資料
    // window.onload = loadData;

function getScriptURL(){
  const scriptURL = "https://script.google.com/macros/s/AKfycby5kZk1CeUQ1-oxC_OIB-vLBFzSVA1MpoCUiC1-6QvoGibibqdjjpS5OJQCIQGWnaY/exec"; // 替換為你的 Web App 網址
  return scriptURL
}