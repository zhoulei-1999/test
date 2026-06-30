from pathlib import Path

from playwright.sync_api import Page, expect


BASE_URL = "http://127.0.0.1:8080"


def test_signup_form_success(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("username-input").fill("zhoulei")
    page.get_by_test_id("email-input").fill("lovebaoqian@gmail.com")
    page.get_by_test_id("pref-ui").check()
    page.get_by_test_id("role-select").select_option("developer")
    page.get_by_test_id("submit-signup").click()

    expect(page.get_by_test_id("form-message")).to_contain_text("提交成功")


def test_signup_form_validation(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("submit-signup").click()

    expect(page.get_by_test_id("form-message")).to_have_text("用户名至少需要 3 个字符。")


def test_async_user_loading(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("load-users").click()

    expect(page.get_by_test_id("users-loading")).to_be_visible()
    expect(page.get_by_text("Ada Lovelace")).to_be_visible()
    expect(page.get_by_text("Grace Hopper")).to_be_visible()
    expect(page.get_by_test_id("users-loading")).to_be_hidden()


def test_modal_confirm_updates_status(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("open-modal").click()
    expect(page.get_by_test_id("modal")).to_be_visible()

    page.get_by_test_id("confirm-modal").click()

    expect(page.get_by_test_id("modal")).to_be_hidden()
    expect(page.get_by_test_id("app-status")).to_have_text("Confirmed")


def test_counter_buttons(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("increment").click()
    page.get_by_test_id("increment").click()
    page.get_by_test_id("decrement").click()

    expect(page.get_by_test_id("counter-value")).to_have_text("1")


def test_local_storage_theme(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("theme-input").fill("smoke")
    page.get_by_test_id("save-theme").click()

    expect(page.get_by_test_id("saved-theme")).to_have_text("已保存：smoke")
    assert page.evaluate("localStorage.getItem('practice-theme')") == "smoke"


def test_file_upload(page: Page, tmp_path: Path) -> None:
    upload_file = tmp_path / "sample.txt"
    upload_file.write_text("hello playwright", encoding="utf-8")

    page.goto(BASE_URL)
    page.get_by_test_id("file-upload").set_input_files(upload_file)

    expect(page.get_by_test_id("file-name")).to_have_text("已选择：sample.txt")


def test_drag_and_drop(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("drag-source").drag_to(page.get_by_test_id("drop-target"))

    expect(page.get_by_test_id("drag-message")).to_have_text("拖拽成功")


def test_table_filter(page: Page) -> None:
    page.goto(BASE_URL)

    page.get_by_test_id("task-search").fill("report")

    expect(page.get_by_text("report export")).to_be_visible()
    expect(page.get_by_text("login flow")).to_be_hidden()
    expect(page.get_by_test_id("task-count")).to_have_text("1 tasks visible")
