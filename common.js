const FormData = require("form-data");
const axios = require("axios");
function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 5; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  console.log(`OTP : ${OTP}`);
  return OTP.at(0);
}

const predict = () => {
  const random = Number(generateOTP());
  // console.log(random);
  if (random > 4) {
    return "big";
  }
  return "small";
};

const getBalance = async () => {
  var formData = new FormData();
  formData.append("uid", 638248);
  formData.append(
    "sign",
    "21EE754BC66501934222C68FE0105806C3E71E04403B19DAB37E015C28BC2CD9"
  );
  formData.append("language", "vi");
  const result = await axios.post(
    `https://92lotteryapi.com/api/webapi/GetWinsUserAmount`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log("Số tiền còn lại : " + result.data?.data?.Amount);
};

const bet = async (issueNum, num) => {
  try {
    var formData = new FormData();
    formData.append("uid", 638248);
    formData.append(
      "sign",
      "21EE754BC66501934222C68FE0105806C3E71E04403B19DAB37E015C28BC2CD9"
    );
    formData.append("amount", "1000");
    formData.append("betcount", "5");
    formData.append("gametype", "2");
    formData.append("selecttype", num || "small");
    formData.append("issuenumber", issueNum);
    formData.append("language", "vi");
    formData.append("typeid", 1);

    const result = await axios.post(
      "https://92lotteryapi.com/api/webapi/GameBetting",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result.data?.msg);
    await getBalance();
    console.log(
      `${Date.now()} - Typeid ${1} - ${issueNum} - Đăt số ${num || "small"}`
    );
    console.log(
      `=====================================================================`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateOTP,
  getBalance,
  predict,
  bet,
};
