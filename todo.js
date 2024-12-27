// DOM 요소들을 미리 저장
// HTML 문서에서 할일 목록을 표시하는 <ul>, 추가 버튼, 입력창 요소를 선택하여 변수에 저장
const todoListElement = document.getElementById("todoList"); // 할일 목록이 표시될 <ul> 요소
const addButton = document.getElementById("addTodo"); // 할일 추가 버튼
const todoInput = document.getElementById("todoInput"); // 할일을 입력받는 <input> 요소

// 새로운 할일 항목을 추가하는 함수
// text: 할일 내용 (string)
// checked: 할일의 완료 상태 (boolean, 기본값 false)
function addTodo(text, checked = false) {
  // 새로운 <li> 요소 생성 (할일 항목)
  const li = document.createElement("li");
  li.classList.add(
    "list-group-item", // Bootstrap 스타일 클래스
    "d-flex",          // Flexbox를 사용하여 아이템 정렬
    "align-items-center", // 수직 중앙 정렬
    "justify-content-between" // 좌우로 요소를 배치
  );

  // 체크박스 요소 생성
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox"; // 체크박스 타입 설정
  checkbox.classList.add("form-check-input"); // Bootstrap 체크박스 스타일 클래스
  checkbox.checked = checked; // 체크박스의 초기 상태를 설정

  // 할일 텍스트를 표시할 <span> 요소 생성
  const spanElement = document.createElement("span");
  spanElement.classList.add("ms-2", "flex-grow-1"); // 왼쪽 마진 및 Flexbox 확장 설정
  spanElement.textContent = text; // <span>에 할일 텍스트 추가

  // 체크박스 상태에 따라 텍스트에 취소선 설정
  spanElement.style.textDecoration = checked ? "line-through" : "none";

  // 체크박스 상태가 변경될 때 실행될 이벤트 리스너 추가
  checkbox.addEventListener("change", () => {
    // 체크박스 상태에 따라 텍스트의 취소선 업데이트
    spanElement.style.textDecoration = checkbox.checked ? "line-through" : "none";

    // localStorage에 저장된 할일 상태를 업데이트
    const todos = loadTodos(); // 기존 할일 목록 불러오기
    const index = Array.from(li.parentElement.children).indexOf(li); // 현재 <li>의 인덱스 찾기
    todos[index].checked = checkbox.checked; // 해당 항목의 완료 상태 업데이트
    saveTodos(todos); // 업데이트된 할일 목록 저장
  });

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2"); // Bootstrap 스타일 클래스
  deleteButton.textContent = "삭제"; // 버튼 텍스트 설정
  deleteButton.addEventListener("click", () => {
    // localStorage에서 현재 항목 삭제
    const todos = loadTodos(); // 기존 할일 목록 불러오기
    const index = Array.from(li.parentElement.children).indexOf(li); // 현재 <li>의 인덱스 찾기
    todos.splice(index, 1); // 해당 인덱스 항목 삭제
    saveTodos(todos); // 업데이트된 할일 목록 저장
    li.remove(); // 화면에서 <li> 요소 삭제
  });

  // <li>에 체크박스, 텍스트, 삭제 버튼 추가
  li.prepend(checkbox); // 체크박스를 가장 앞에 추가
  li.append(spanElement); // 텍스트를 가운데 추가
  li.append(deleteButton); // 삭제 버튼을 가장 뒤에 추가
  todoListElement.append(li); // <li>를 할일 목록 <ul>에 추가
}

// localStorage에서 저장된 할일 목록을 불러오는 함수
function loadTodos() {
  const savedTodos = localStorage.getItem("todoList"); // localStorage에서 "todoList" 키의 데이터 가져오기
  return savedTodos ? JSON.parse(savedTodos) : []; // JSON 데이터 파싱 후 반환 (없으면 빈 배열 반환)
}

// localStorage에 할일 목록을 저장하는 함수
function saveTodos(todos) {
  localStorage.setItem("todoList", JSON.stringify(todos)); // 할일 목록을 JSON 문자열로 변환하여 저장
}

// 페이지 로드 시 초기화 작업을 수행하는 함수
function initialize() {
  // localStorage에서 저장된 할일 목록 불러오기
  const todos = loadTodos();

  // 저장된 할일 목록을 화면에 표시
  todos.forEach((todo) => {
    addTodo(todo.text, todo.checked); // 각 항목을 추가
  });

  // 추가 버튼 클릭 이벤트 리스너 추가
  addButton.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return; // 빈 입력값 방지

    // 새로운 할일 항목을 추가
    addTodo(todoInput.value);

    // localStorage에 새로 추가된 할일 저장
    const todos = loadTodos(); // 기존 할일 목록 불러오기
    const todoData = {
      text: todoInput.value, // 입력된 텍스트
      checked: false, // 기본 완료 상태는 false
    };
    todos.push(todoData); // 새 항목 추가
    saveTodos(todos); // 업데이트된 목록 저장

    // 입력창 초기화
    todoInput.value = "";
  });
}

// DOMContentLoaded 이벤트 발생 시 초기화 함수 호출
document.addEventListener("DOMContentLoaded", initialize);
