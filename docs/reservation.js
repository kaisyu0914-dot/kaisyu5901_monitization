document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#reservationForm");
  const complete = document.querySelector("#formComplete");
  const menuSelect = document.querySelector("#menuSelect");
  const studentDiscount = document.querySelector("#studentDiscount");
  const totalPrice = document.querySelector("#totalPrice");
  const discountMessage = document.querySelector("#discountMessage");

  const updateTotal = () => {
    const selectedOption = menuSelect.options[menuSelect.selectedIndex];
    const basePrice = Number(selectedOption.dataset.price || 0);

    if (!basePrice) {
      totalPrice.textContent = "¥—";
      discountMessage.textContent = "メニューを選択すると料金が表示されます";
      return;
    }

    const isStudent = studentDiscount.checked;
    const total = isStudent ? Math.floor(basePrice * 0.8) : basePrice;
    totalPrice.textContent = `¥${total.toLocaleString("ja-JP")}`;
    discountMessage.textContent = isStudent
      ? "学生割引20%OFFを適用した料金です"
      : "学生の方は学生証の提示で20%OFFになります";
  };

  menuSelect.addEventListener("change", updateTotal);
  studentDiscount.addEventListener("change", updateTotal);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.hidden = true;
    complete.hidden = false;
    complete.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
