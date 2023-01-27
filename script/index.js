const submitButton = document.getElementById("submit");
const industry = document.getElementById("industry");
const goals = document.getElementById("goals");
const targetMarket = document.getElementById("target-market");
const res = document.getElementById("res");
const pacMan = document.getElementById("pac-man");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    industry.value === "" ||
    goals.value === "" ||
    targetMarket.value === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  pacMan.style.display = "block";
  setTimeout(() => {
    pacMan.style.opacity = "1";
    pacMan.style.marginBlock = "2em";
    pacMan.style.marginBottom = "4em";
  }, 30);
  submitButton.disabled = true;
  submitButton.style.cursor = "not-allowed";
  submitButton.value = "Generating...";
  res.style.paddingBlock = "0px";
  res.style.margin = "0px";
  res.style.marginTop = "0px";
  res.style.height = "0px";
  setTimeout(() => {
    res.innerHTML = "";
  }, 300);

  submitButton.style.backgroundColor = "grey";
  analyzeGpt(industry.value, goals.value, targetMarket.value).then((data) => {
    submitButton.disabled = false;
    submitButton.style.cursor = "pointer";
    submitButton.style.backgroundColor = "#0088a0";
    submitButton.value = "Generate Now";
    pacMan.style.display = "none";
    pacMan.style.opacity = "0";
    pacMan.style.marginBlock = "0em";
    res.style.paddingBlock = "30px";
    res.style.height = "auto";
    res.style.margin = "30px";
    res.innerHTML = data;
  });
});

const analyzeGpt = async (industry, goals, targetMarket) => {
  // make post request to gpt3 api
  const prompt = `Write a business plan for a ${industry} industry that aims to ${goals} and target ${targetMarket} market`;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 2048,
    }),
  });

  const data = await response.json();
  console.log(data);
  return data.choices[0].text.replace(/\n/g, "<br />");
};
