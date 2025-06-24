
    const scriptURL = "https://script.google.com/macros/s/AKfycbznGNV7uuUoXGXkX609qypmx8xyeM3T2j1neXqowDRiNSlxS5m9OzBmI4oV5yQvMA/exec"; // 替換為你的 Web App 網址

    function sendData() {
      const name = encodeURIComponent(document.getElementById("name").value);
      const email = encodeURIComponent(document.getElementById("email").value);

      fetch(`${scriptURL}?action=write&name=${name}&email=${email}`)
        .then(response => response.text())
        .then(data => {
          alert("送出成功：" + data);
          loadData(); // 插入後重新載入
        })
        .catch(error => alert("錯誤：" + error));
    }

    function loadData() {
      fetch(`${scriptURL}?action=read`)
        .then(response => response.json())
        .then(data => {
          const tbody = document.querySelector("#dataTable tbody");
          tbody.innerHTML = ""; // 清空表格
          data.forEach((row, index) => {
            if (index === 0) return; // 跳過標頭
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td>`;
            tbody.appendChild(tr);
          });
        })
        .catch(error => console.error("載入資料錯誤：", error));
    }

    // 頁面載入時讀取資料
    window.onload = loadData;
