window.onload = () => {
  const email = document.getElementById("email-id");
  email.innerHTML = localStorage.getItem("emailStorage");
  const checkIsLogin = localStorage.getItem("checkIsLogin");
  const isAuthenticated = (checkIsLogin === "true");
  if (!isAuthenticated) {
    window.location.replace("./login-page.html");
  }
};

const logOut = () => {
  localStorage.clear();
  window.location.replace("./login-page.html");
}

const getCity = () => {
  const select = document.getElementById("select");
  const value = select.options[select.selectedIndex].value;
  getWeatherData(value);
}


const citiesList = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop", "Sivas", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"];

for (let i = 0; i < citiesList.length; i++) {
  let option = document.createElement("option");
  txt = document.createTextNode(citiesList[i]);
  option.appendChild(txt);
  option.setAttribute("value", citiesList[i]);
  select.insertBefore(option, select.lastChild);
}


const getWeatherData = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=69f27776fcc2ef53fa6dea89dd4a4aeb&lang=TR&units=metric`;
  await fetch(url, {
    method: "GET",
  })
    .then((data) => {
      const res = data.json();
      return res;
    })
    .then((objectData) => {
      const tableData = createArray(objectData);
      console.log(tableData);
      return tableData;
    })
    .then((arrayToSend) => {
      createTableFromJSON(arrayToSend);
    })
    .catch((err) => alert(err));
};

const createTableFromJSON = (tableData) => {
  console.log(tableData);
  let columns = [];

  for (let index = 0; index < tableData.length; index++) {
    for (let key in tableData[index]) {
      if (columns.indexOf(key) === -1) {
        columns.push(key);
      }
    }
  }

  let table = document.createElement("table");
  table.setAttribute("id", "tableId");
  table.setAttribute("class", "table");

  let tr = table.insertRow(-1);

  for (let index = 0; index < columns.length; index++) {
    let th = document.createElement("th");
    th.innerHTML = columns[index];
    tr.appendChild(th);
  }

  for (let index = 0; index < tableData.length; index++) {
    tr = table.insertRow(-1);
    for (let value = 0; value < columns.length; value++) {
      let tableCell = tr.insertCell(-1);
      tableCell.innerHTML = tableData[index][columns[value]];
    }
  }

  let element = document.getElementById("container");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(table);
};

const createArray = (arr) => {
  let weather = [];
  arr.list.map((item) => {
    weather.push({
      date: formatDate(item.dt_txt),
      temperature: item.main.temp,
      weather: item.weather[0].description,
      humidity: item.main.humidity,
    });
  });
  return weather;
};

function formatDate(date) {
  let datePart = date.match(/\d+/g);
  year = datePart[0];
  month = datePart[1];
  day = datePart[2];
  hour = datePart[3];
  min = datePart[4];
  return day + '/' + month + '/' + year + ' ' + hour + ':' + min;
}


const searchFunction = () => {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value;
  table = document.getElementById("tableId");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];
    td3 = tr[i].getElementsByTagName("td")[3];
    if (td) {
      if ((td.innerHTML.indexOf(filter) > -1) || (td1.innerHTML.indexOf(filter) > -1) || (td2.innerHTML.indexOf(filter) > -1) || (td3.innerHTML.indexOf(filter) > -1)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
