const submitButton = document.getElementById("submit");
const industry = document.getElementById("industry");
const goals = document.getElementById("goals");
const targetMarket = document.getElementById("target-market");
const res = document.getElementById("res");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  analyzeGpt(industry.value, goals.value, targetMarket.value).then((data) => {
    res.style.padding = "30px";
    res.style.margin = "30px";
    res.innerHTML = data;
  });
});

const analyzeGpt = async (industry, goals, targetMarket) => {
  // make post request to gpt3 api
  const prompt = `Write a business plan for a ${industry} industry that aims to ${goals} and target ${targetMarket} market`;
  console.log(prompt);
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
  console.log(data.choices[0]);
  return data.choices[0].text.replace(/\n/g, "<br />");
};

 
// document.getElementById("submit-button").addEventListener("click", function() {
  // document.getElementById("loading").style.display = "block";
 
// });
// document.getElementById("loading").style.display = "none"; 
