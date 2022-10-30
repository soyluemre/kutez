const inputDate = document.querySelector("#datepicker");
const inputType = document.querySelector("#productstyle");
const inputQuantity = document.querySelector("#productnumber");
const calculateButton = document.querySelector(".calc-btn button");
const resultText = document.querySelector(".calc-btn h3");
const myModal = new bootstrap.Modal(document.querySelector("#myModal"));
const inputIcons = document.querySelector(".input-icons .fa-sharp");

const iconShow = () => {
  inputIcons.style.display = "block";
};

const iconHidden = () => {
  inputIcons.style.display = "none";
};

const changeColor = () => {
  inputType.style.color = "black";
  inputDate.style.color = "black";
  inputQuantity.style.color = "black";
};

let minDate = new Date().toJSON().split("T")[0];
inputDate.setAttribute("min", minDate);

let shippingTime;

calculateButton.addEventListener("click", () => {
  timeCalculation();
});

const timeCalculation = () => {
  if (inputType.value == "cotton" && Number(inputQuantity.value) < 50) {
    shippingTime = 2;
  }
  if (inputType.value == "cotton" && Number(inputQuantity.value) >= 50) {
    shippingTime = 3;
  }
  if (inputType.value == "linen" && Number(inputQuantity.value) < 50) {
    shippingTime = 4;
  }
  if (inputType.value == "linen" && Number(inputQuantity.value) >= 50) {
    shippingTime = 5;
  }

  let shippingDate = new Date(inputDate.value);
  let counter = 1;

  while (counter <= shippingTime) {
    shippingDate.setDate(shippingDate.getDate() + 1);
    if (shippingDate.getDay() == 0 || shippingDate.getDay() == 6) {
      continue;
    } else if (
      (shippingDate.getDate() == 4 && shippingDate.getMonth() == 6) ||
      (shippingDate.getDate() == 25 && shippingDate.getMonth() == 11)
    ) {
      continue;
    } else {
      counter++;
    }
  }

  if (
    !inputQuantity.value ||
    !inputType.value ||
    inputType.value == "Fabric Type" ||
    !inputDate.value
  ) {
    myModal.show();
    inputDate.value = "";
    inputQuantity.value = "";
    resultText.innerHTML = `Please enter your order information to estimate shipping date`;
  } else if (inputQuantity.value == 0) {
    resultText.innerHTML = `<b style="color: #5b16b4">The amount must be greater than 0.</b>`;
  } else if (inputQuantity.value > 100) {
    resultText.innerHTML = `<b style="color: #5b16b4">Amount must be between 1-100.</b>`;
  } else {
    resultText.innerHTML = `Your Estimated Shipping Time Is <b>${shippingDate.getDate()}.${
      shippingDate.getMonth() + 1
    }.${shippingDate.getFullYear()}</b>`;
  }
};
