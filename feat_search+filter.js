// Search & filtering

// DOM 요소 선택
const searchFilter = document.getElementById('searchFilter');
const todoList = document.getElementById('todoList');

// 검색어에 따라 할일 항목들을 필터링하는 함수
function filterTodos() {
    // 검색어 가져오기 (소문자로 변환하여 대소문자 구분 없이 검색)
    const searchTerm = searchFilter.value.toLowerCase();
    
    // 모든 할일 항목을 순회
    const todoItems = todoList.getElementsByTagName('li');
    Array.from(todoItems).forEach(item => {
        // 각 항목의 텍스트 내용 가져오기 (span 요소 내의 텍스트)
        const todoText = item.querySelector('span').textContent.toLowerCase();
        
        // 기존 하이라이트 스타일 제거
        item.style.backgroundColor = '';
        
        // 검색어가 있고, 할일 텍스트에 검색어가 포함되어 있다면
        if (searchTerm && todoText.includes(searchTerm)) {
            // 배경색을 옅은 초록색으로 변경
            item.style.backgroundColor = '#e8f5e9';
        }
    });
}

// 입력창에 입력이 있을 때마다 필터링 함수 실행
searchFilter.addEventListener('input', filterTodos);