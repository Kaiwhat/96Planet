// 獲取必要的DOM元素
const calendardays = document.getElementById('calendar-days');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

// 初始化當前日期
let currentDate = new Date();
let Nowaday = new Date();
let selectedDay = null; // 用於存儲選中的日期

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
  let i = 0;
  let stop = false;
  for (let i = 0; i < 6; i++) {
    if(stop) break;
    let k = 1;
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
            day.textContent = k++;
            day.style.color = "gray";
            stop = true;
        } else {
            // 當月日期
            day.textContent = date;

            if(date == Nowaday.getDate() && currentDate.getMonth() == Nowaday.getMonth() && currentDate.getFullYear() == Nowaday.getFullYear()){
                day.style.backgroundColor = '#D3D3D3';
                day.style.borderRadius = '99em';
                day.style.transition = 'width 0.2s ease-in-out, height 0.2s ease-in-out';
            }else if (j == 0 || j == 6){
              day.style.color = 'red';
            }
            // 根據資料庫記錄設置背景顏色
            /*
            const databaseRecord = getDatabaseRecordForDate(currentDate.getFullYear(), currentDate.getMonth() + 1, date);
            if (databaseRecord === 'approved') {
                day.style.backgroundColor = '';
            } else if (databaseRecord === 'pending') {
                day.style.backgroundColor = '';
            }
            */

            // 添加點擊事件監聽器
            day.addEventListener('click', () => {
              selectDay(day, i, j, firstDayIndex);
            });

            date++;
        }

        calendardays.appendChild(day);
    }
  }
}

function DateChoose(dateString) {
  document.getElementById('gobook-Date').value = dateString || '';
}

function selectDay(dayElement, i, j, dayminus) {
  // 清除之前選中的日期
  if (selectedDay) {
    selectedDay.style.backgroundColor = '';
  }

  // 設置新選中的日期
  if (dayElement.classList.contains('prev-month') || dayElement.classList.contains('next-month')) {
    // 不選中上個月或下個月的日期
    selectedDay = null;
    DateChoose(null); // 清空输入框
  } else {
    selectedDay = dayElement;
    selectedDay.style.backgroundColor = 'pink';
    selectedDay.style.borderRadius = '99em';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const selectedDate = `${year}-${month.toString().padStart(2, '0')}-${(i*7+j+1-dayminus).toString().padStart(2, '0')}`;
    DateChoose(selectedDate); // 更新输入框
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


var images = ['/images/image1.png', '/images/image2.png', '/images/image3.png', '/images/image4.png', '/images/image5.png', '/images/image6.png'];
var currentimg = 0;

var changeimg = function(num){
  currentimg = (currentimg + num + 5)%5;
  document.getElementById('main_image').src = images[currentimg];
};

document.getElementById('prev').onclick = function(){
  changeimg(-1);
  clearInterval(intervalId); // 清除之前的計時器
  startAutoPlay(); // 重新啟動計時器
};

document.getElementById('next').onclick = function(){
  changeimg(1);
  clearInterval(intervalId); // 清除之前的計時器
  startAutoPlay(); // 重新啟動計時器  
};

let intervalId;
const interval = 5000; // 5秒的間隔時間

function startAutoPlay() {
  intervalId = setInterval(() => {
    changeimg(1);
  }, interval);
}

startAutoPlay();
DateChoose("請在下方日曆選取時間");
