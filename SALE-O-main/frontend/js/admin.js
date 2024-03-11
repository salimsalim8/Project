// PROFILE DROP
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
    dropdownProfile.classList.toggle('show');
});



//MENU
const allMenu = document.querySelectorAll('main .content-info .head .menu');

allMenu.forEach(item=> {
    const icon = item.querySelector('.icon');
    const menuLink = item.querySelector('.menu-link');

    icon.addEventListener('click', function () {
        menuLink.classList.toggle('show');
    });
});



window.addEventListener('click', function (e) {
    if (e.target !== imgProfile) {
        if (e.target !== dropdownProfile) {
            if (dropdownProfile.classList.contains('show')) {
                dropdownProfile.classList.remove('show');
            }
        }
    }
    allMenu.forEach(item=> {
       const icon = item.querySelector('.icon');
       const menuLink = item.querySelector('.menu-link');
        
       if (e.target !== icon) {
            if(e.target !== menuLink) {
              if(menuLink.classList.contains('show')) {
                menuLink.classList.remove('show')
              }
            }
       }
  });
      
});


//SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-menu');
const sidebar = document.getElementById('sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider')

toggleSidebar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');

     if(sidebar.classList.contains('hide')) {
        allSideDivider.forEach(item=> {
          item.textContent = '-'
        })
     } else {
      allSideDivider.forEach(item=> {
        item.textContent = item.dataset.text
     })
     }

     

     
});



//PROGRESS
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
    item.style.setProperty('--value', item.dataset.value);
});

const scardProgress = document.querySelectorAll('.s-card .card .progress');

scardProgress.forEach(item=> {
    item.style.setProperty('--value', item.dataset.value);
});


//POPUP

let popup = document.getElementById("popup");

function openPopup() {
popup.classList.add("open-popup");
}

function closePopup() {
popup.classList.remove("open-popup");
}

//POPUP-SELL
var sellButtons = document.getElementsByClassName('sellBtn');
var sellPopup = document.getElementById('sellPopup');
var closeSellPopupBtn = document.getElementById('closeSellPopupBtn');
var sellForm = document.getElementById('sellForm');

for (var i = 0; i < sellButtons.length; i++) {
  sellButtons[i].addEventListener('click', function() {
    sellPopup.style.display = 'block';
  });
}

closeSellPopupBtn.addEventListener('click', function() {
  sellPopup.style.display = 'none';
});

sellForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var sellQuantity = document.getElementById('sellQuantity').value;
  var sellPrice = document.getElementById('sellPrice').value;

  // Do something with the form data (e.g., update the table or submit it to a server)
  console.log('Quantity:', sellQuantity);
  console.log('Selling Price:', sellPrice);

  // Reset the form
  sellForm.reset();
  sellPopup.style.display = 'none';
});

//POPUP-SELL


//APEXCHART
var options = {
  series: [{
  name: 'series1',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'series2',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
  chart: {
  height: 350,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'datetime',
  categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
},
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
