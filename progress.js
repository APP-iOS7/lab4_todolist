// Progress Bar 업데이트 함수
function updateProgressBar() {
    const todoListElement = document.getElementById("todoList");
    const progressBar = document.getElementById("progressBar");

    // 전체 항목 수 계산
    const totalItems = todoListElement.children.length; // 전체 항목 수
    if (totalItems === 0) {
        progressBar.style.width = `0%`;
        progressBar.textContent = `0%`;
        return;
    }

    // 완료된 항목(체크된 체크박스를 가진 <li>) 수 계산
    const checkedItems = Array.from(todoListElement.children).filter((li) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        return checkbox && checkbox.checked;
    }).length;

    // 완료된 항목 비율을 계산 (진행률 계산)
    const progress = Math.round((checkedItems / totalItems) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress); // Progress Bar의 접근성 속성(현재 값) 업데이트
    progressBar.textContent = `${progress}%`;
}
