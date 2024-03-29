// 獲取必要的DOM元素
const calendardays = document.getElementById('calendar-days');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

// 初始化當前日期
let currentDate = new Date();

// 渲染月曆
function renderCalendar() {
  // 清空之前的日期格子
  calendardays.innerHTML = '';

  // 獲取當月的第一天和最後一天
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() , 0);

  // 更新當前月份標題
  currentMonthSpan.textContent = `${currentDate.getFullYear()} 年 ${currentDate.getMonth() + 1} 月`;

  // 獲取當月第一天是星期幾
  const firstDayIndex = firstDayOfMonth.getDay();
  const lastDayIndex = lastDayOfLastMonth.getDate();

  // 創建日期格子
  let date = 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
        const day = document.createElement('div');

        if (i === 0 && j < firstDayIndex) {
            // 在第一週補充上個月的日期
            //day.classList.add('prev-month');
            day.textContent = lastDayIndex - (firstDayIndex - j) + 1;
            day.style.color = "gray";
        } else if (date > lastDayOfMonth.getDate()) {
            // 在最後一週補充下個月的日期
            //day.classList.add('next-month');
        } else {
            // 當月日期
            day.textContent = date;
            if (j == 0 || j == 6){
                day.style.color = 'red';
            }
            // 根據資料庫記錄設置背景顏色
            const databaseRecord = getDatabaseRecordForDate(currentDate.getFullYear(), currentDate.getMonth() + 1, date);
            if (databaseRecord === 'approved') {
                day.style.backgroundColor = '';
            } else if (databaseRecord === 'pending') {
                day.style.backgroundColor = '';
            }

            date++;
        }

        calendardays.appendChild(day);
    }
  }
}

// 獲取資料庫記錄的函數（這裡只是一個假設的函數,你需要根據實際情況來實現）
function getDatabaseRecordForDate(year, month, date) {
  // 這裡需要你實現根據日期從資料庫獲取記錄的邏輯
  // 返回值可以是 'approved'、'pending' 或者其他值
  return 'approved';
}

// 切換到上一個月
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

// 切換到下一個月
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

// 綁定事件監聽器
prevMonthBtn.addEventListener('click', prevMonth);
nextMonthBtn.addEventListener('click', nextMonth);

// 初始渲染月曆
renderCalendar();