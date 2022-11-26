// Trunk and logic for "," on decimals
const truncateString = (str) => {
  return str.length > 10 ? str.slice(0, 10) + "..." : str;
};
function customRound(number) {
  return (
    Math.floor(Math.floor(number * 10) / 10) +
    "," +
    (Math.floor(number * 10) % 10)
  );
}

// Fetch the data
fetch(
  "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1",
  {
    method: "GET",
  }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    let domesticCost = 0;
    let importedCost = 0;

    let domesticCount;
    let importedCount;

    // Domestic products
    console.log(". Domestic");
    data.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    for (let i = 0; i < data.length; i++) {
      if (data[i].domestic === true) {
        let prices = data[i].price;
        domesticCost += prices;
        let count = data.filter((i) => i.domestic === true);
        domesticCount = count.length;

        console.log("... " + data[i].name);
        console.log("Price: $" + customRound(data[i].price));
        console.log(truncateString(data[i].description));
        console.log(
          "Weight: " + (data[i].weight ? data[i].weight + "g" : "N/A")
        );
      }
    }

    // Imported products
    console.log(". Imported");
    data.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    for (let i = 0; i < data.length; i++) {
      if (data[i].domestic === false) {
        let prices = data[i].price;
        importedCost += prices;
        let count = data.filter((i) => i.domestic === false);
        importedCount = count.length;

        console.log("... " + data[i].name);
        console.log("Price: $" + customRound(data[i].price));
        console.log(truncateString(data[i].description));
        console.log(
          "Weight: " + (data[i].weight ? data[i].weight + "g" : "N/A")
        );
      }
    }

    // Total
    console.log(`Domestic cost: $${customRound(domesticCost)}`);
    console.log(`Imported cost: $${customRound(importedCost)}`);
    console.log(`Domestic count: ${domesticCount}`);
    console.log(`Imported count: ${importedCount}`);
  })
  .catch((err) => {
    console.warn("Something went wrong.", err);
  });
