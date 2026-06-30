const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const form = $('[data-testid="signup-form"]');
const formMessage = $('[data-testid="form-message"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const username = String(data.get('username') || '').trim();
  const email = String(data.get('email') || '').trim();
  const role = String(data.get('role') || '');
  const preferences = data.getAll('preference');

  formMessage.className = 'message';

  if (username.length < 3) {
    formMessage.textContent = '用户名至少需要 3 个字符。';
    formMessage.classList.add('error');
    return;
  }

  if (!email.includes('@')) {
    formMessage.textContent = '请输入有效邮箱。';
    formMessage.classList.add('error');
    return;
  }

  if (!role) {
    formMessage.textContent = '请选择角色。';
    formMessage.classList.add('error');
    return;
  }

  if (preferences.length === 0) {
    formMessage.textContent = '请至少选择一个测试偏好。';
    formMessage.classList.add('error');
    return;
  }

  formMessage.textContent = `提交成功：${username} / ${role}`;
  formMessage.classList.add('success');
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    formMessage.className = 'message';
    formMessage.textContent = '';
  }, 0);
});

const users = [
  { name: 'Ada Lovelace', role: 'Automation Lead' },
  { name: 'Grace Hopper', role: 'Compiler Expert' },
  { name: 'Linus Torvalds', role: 'Kernel Maintainer' },
];

$('[data-testid="load-users"]').addEventListener('click', () => {
  const loading = $('[data-testid="users-loading"]');
  const list = $('[data-testid="users-list"]');
  loading.hidden = false;
  list.innerHTML = '';

  window.setTimeout(() => {
    loading.hidden = true;
    list.innerHTML = users
      .map((user) => `<li><strong>${user.name}</strong><br><span>${user.role}</span></li>`)
      .join('');
  }, 800);
});

$('[data-testid="clear-users"]').addEventListener('click', () => {
  $('[data-testid="users-list"]').innerHTML = '';
  $('[data-testid="users-loading"]').hidden = true;
});

let count = 0;
const counterValue = $('[data-testid="counter-value"]');
const updateCounter = () => {
  counterValue.textContent = String(count);
};

$('[data-testid="increment"]').addEventListener('click', () => {
  count += 1;
  updateCounter();
});

$('[data-testid="decrement"]').addEventListener('click', () => {
  count -= 1;
  updateCounter();
});

const modal = $('[data-testid="modal"]');
$('[data-testid="open-modal"]').addEventListener('click', () => modal.showModal());
$('[data-testid="close-modal"]').addEventListener('click', () => modal.close('closed'));
$('[data-testid="confirm-modal"]').addEventListener('click', () => {
  $('[data-testid="app-status"]').textContent = 'Confirmed';
  modal.close('confirmed');
});

const themeInput = $('[data-testid="theme-input"]');
const savedTheme = $('[data-testid="saved-theme"]');
const storedTheme = localStorage.getItem('practice-theme');
if (storedTheme) {
  savedTheme.textContent = `已保存：${storedTheme}`;
}

$('[data-testid="save-theme"]').addEventListener('click', () => {
  const value = themeInput.value.trim();
  if (!value) {
    savedTheme.textContent = '请输入主题名';
    savedTheme.className = 'message error';
    return;
  }

  localStorage.setItem('practice-theme', value);
  savedTheme.textContent = `已保存：${value}`;
  savedTheme.className = 'message success';
});

$('[data-testid="file-upload"]').addEventListener('change', (event) => {
  const file = event.target.files[0];
  $('[data-testid="file-name"]').textContent = file ? `已选择：${file.name}` : '未选择文件';
});

const dragSource = $('[data-testid="drag-source"]');
const dropTarget = $('[data-testid="drop-target"]');
const dragMessage = $('[data-testid="drag-message"]');

dragSource.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', 'practice-card');
});

dropTarget.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropTarget.classList.add('active');
});

dropTarget.addEventListener('dragleave', () => {
  dropTarget.classList.remove('active');
});

dropTarget.addEventListener('drop', (event) => {
  event.preventDefault();
  dropTarget.classList.remove('active');
  const value = event.dataTransfer.getData('text/plain');
  dragMessage.textContent = value === 'practice-card' ? '拖拽成功' : '拖拽数据不匹配';
  dragMessage.className = value === 'practice-card' ? 'message success' : 'message error';
});

const searchInput = $('[data-testid="task-search"]');
const taskRows = $$('[data-testid="task-table"] tr');
const taskCount = $('[data-testid="task-count"]');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  taskRows.forEach((row) => {
    const matches = row.textContent.toLowerCase().includes(query);
    row.hidden = !matches;
    if (matches) visible += 1;
  });

  taskCount.textContent = `${visible} tasks visible`;
});
