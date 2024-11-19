async function dohvatiPodatke() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Greška pri dohvaćanju podataka");
    }
    const jsonData = await response.json();
    console.log(jsonData);
    popuniTablicu(jsonData);
    popuniKartice(jsonData);
  } catch (error) {
    console.error("Greška:", error);
  }
}

function popuniTablicu(jsonData) {
  const tbody = document.querySelector("#mojaTablica tbody");

  // Iteriraj kroz JSON podatke
  jsonData.forEach((red) => {
    const tr = document.createElement("tr");

    // Iteriraj kroz svaki stupac u trenutnom redu
    Object.values(red).forEach((value) => {
      const td = document.createElement("td");

      if (value === "Da") {
        td.innerHTML =
          "<span class='icon'><img src='Icons/check-table.svg' class='icon__item'></span>";
      } else if (value === "Ne") {
        td.innerHTML =
          "<span class='icon'><img src='Icons/cross-table.svg' class='icon__item'></span>";
      } else {
        td.textContent = value;
      }

      tr.appendChild(td);
    });

    // Dodaj 8. stupac s gumbe unutar div elementa
    const fiksniTd = document.createElement("td");

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("main-content__dashboard-data__table__action");

    const button1 = document.createElement("button");
    button1.classList.add("main-content__dashboard-data__table__action-btn");
    button1.innerHTML =
      '<img src="Icons/hamburger.svg" alt="" class="main-content__dashboard-data__table__action-btn__img">';

    const button2 = document.createElement("button");
    button2.classList.add("main-content__dashboard-data__table__action-btn");
    button2.innerHTML =
      '<img src="Icons/file-green.svg" alt="" class="main-content__dashboard-data__table__action-btn__img">';

    buttonDiv.appendChild(button1);
    buttonDiv.appendChild(button2);

    fiksniTd.appendChild(buttonDiv);

    tr.appendChild(fiksniTd);

    tbody.appendChild(tr);
  });
}

function popuniKartice(jsonData) {
  const container = document.getElementById("cardsContainer");

  // Iteriraj kroz JSON podatke i kreiraj karticu za svaki element
  jsonData.forEach((item) => {
    const kartica = document.createElement("div");
    kartica.classList.add("main-content__dashboard-data__card");

    let statusImageSrc = "Icons/certificate-gold.svg";

    if (item.stupac6 === "Ne") {
      statusImageSrc = "Icons/denied.svg";
    }

    kartica.innerHTML = `
          <div class="main-content__dashboard-data__card__item">
									<div class="main-content__dashboard-data__card__item-status" id="status">
										<img src="${statusImageSrc}" alt="" class="main-content__dashboard-data__card__item-status-img"></div>
									<div class="main-content__dashboard-data__card__item-text">
										<div class="main-content__dashboard-data__card__item-text-info">
											<p class="main-content__dashboard-data__card__item-text-info--title">${item.stupac1}</p>
											<p class="main-content__dashboard-data__card__item-text-info--person">${item.stupac2}</p>
											<div class="main-content__dashboard-data__card__item-text-info--double">
												<p class="main-content__dashboard-data__card__item-text-info--double-left">Ovjera u tijeku:</p>
												<p class="main-content__dashboard-data__card__item-text-info--double-right">${item.stupac5}</p>
											</div>
											<div class="main-content__dashboard-data__card__item-text-info--double">
												<p class="main-content__dashboard-data__card__item-text-info--double-left">Odobreno:</p>
												<p class="main-content__dashboard-data__card__item-text-info--double-right">${item.stupac6}</p>
											</div>
											<div class="main-content__dashboard-data__card__item-text-info--double">
												<p class="main-content__dashboard-data__card__item-text-info--double-left">Serijska:</p>
												<p class="main-content__dashboard-data__card__item-text-info--double-right">${item.stupac7}</p>
											</div>
											<div class="main-content__dashboard-data__card__item-text-info--double">
												<p class="main-content__dashboard-data__card__item-text-info--double-left">Završetak:</p>
												<p class="main-content__dashboard-data__card__item-text-info--double-right">${item.stupac4}</p>
											</div>

										</div>
									</div>
								</div>
								<div class="main-content__dashboard-data__card__item-text-date">${item.stupac4}</div>
								<div class="main-content__dashboard-data__card__action">
									<img src="Icons/menu-three-dots.svg" alt="" class="main-content__dashboard-data__card__action-img"></div>
							</div>
      `;

    container.appendChild(kartica);
  });
}

window.onload = dohvatiPodatke;

const toggleButton = document.getElementById("izbornikBtn");
const menu = document.getElementById("izbornik");

toggleButton.addEventListener("click", () => {
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});
