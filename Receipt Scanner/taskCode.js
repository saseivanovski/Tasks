//Trunk string, adding "," on decimals
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

//Get Data
function fetchData() {
  const url =
    "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1";
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      produceReport(data);
    })
    .catch((err) => {
      console.log("Something went wrong.", err);
    });
}

//Products
function produceDetailedReport(data, isDomestic) {
  if (isDomestic) {
    console.log(". Domestic");
  } else {
    console.log(". Imported");
  }

  let filteredProducts = data
    .filter((product) => product.domestic === isDomestic)
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  filteredProducts.forEach((product) => printProduct(product));
}

function printProduct(product) {
  console.log("... " + product.name);
  console.log("    Price: $" + customRound(product.price));
  console.log("    " + truncateString(product.description));
  console.log("    Weight: " + (product.weight ? product.weight + "g" : "N/A"));
}

//Costs
function produceReport(data) {
  let domesticCost = data
    .filter((product) => product.domestic === true)
    .reduce(function (sum, product) {
      return sum + product.price;
    }, 0);
  let importedCost = data
    .filter((product) => product.domestic === false)
    .reduce(function (sum, product) {
      return sum + product.price;
    }, 0);

  let domesticCount = data.filter(
    (product) => product.domestic === true
  ).length;
  let importedCount = data.filter(
    (product) => product.domestic === false
  ).length;

  //printing products than costs
  produceDetailedReport(data, true);
  produceDetailedReport(data, false);

  console.log(`Domestic cost: $${customRound(domesticCost)}`);
  console.log(`Imported cost: $${customRound(importedCost)}`);
  console.log(`Domestic count: ${domesticCount}`);
  console.log(`Imported count: ${importedCount}`);
}

fetchData();
