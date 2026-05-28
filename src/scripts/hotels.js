const HOTELS = {
  belek: {
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Premium Belek",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Современный отель в окружении соснового леса и Средиземного моря. Номера с живописными видами, изысканные блюда от шеф-поваров, большой спа-центр Anjana Spa с бьюти-процедурами и массажем подарят Вам приятные эмоции от пребывания!",
    ],
    scheduleTitle: "Звездный состав:",
    schedule: [
      ["Роман Павлюченко", "12.06 - 23.06.2026"],
      ["Павел Погребняк", "26.06 - 20.07.2026"],
      ["Андрей Каряка", "06.07 - 20.07.2026"],
      ["Александр Самедов", "20.07 - 02.08.2026"],
      ["Егор Титов", "02.08 - 16.08.2026"],
      ["Роман Шишкин", "16.08 - 20.08.2026"],
    ],
  },
  tekirova: {
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Premium Tekirova",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Юных спортсменов ждут: организация матчей в формате настоящего турнира, профессиональное судейство, торжественная церемония награждения, памятные призы и кубки, атмосфера большого футбольного праздника.",
      "Турнир станет прекрасным дополнением к отдыху в отелях Rixos, объединяя спорт, азарт соревнований и премиальный семейный отдых.",
    ],
    scheduleTitle: "Звездный состав:",
    schedule: [
      ["Денис Ткачук", "31.05 - 14.06.2026"],
      ["Роман Шишкин", "14.06 - 28.06.2026"],
      ["Кирилл Набабкин", "28.06 - 12.07.2026"],
      ["Александр Ширко", "12.07 - 24.07.2026"],
      ["Владислав Радимов", "24.07 - 05.08.2026"],
      ["Алексей Смертин", "05.08 - 17.08.2026"],
      ["Александр Коломейцев", "05.08 - 17.08.2026"],
    ],
  },
  sungate: {
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Premium Sungate",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Один из самых популярных отелей знаменитой сети, в 10 минутах от Кемера. Территория 250 тысяч м2 с развитой инфраструктурой для незабываемого семейного отдыха — детский клуб с года до 17 лет, 20+ различных активностей, шикарные рестораны и спа.",
    ],
    scheduleTitle: "Звездный состав:",
    schedule: [
      ["Роман Шишкин", "01.05 - 13.05.2026"],
      ["Дмитрий Лоськов", "26.05 - 08.06.2026"],
      ["Алексей Смертин", "08.06 - 19.06.2026"],
      ["Тарас Бурлак", "19.06 - 03.07.2026"],
      ["Дмитрий Сенников", "05.07 - 20.07.2026"],
      ["Павел Погребняк", "21.07 - 31.07.2026"],
      ["Олег Корнаухов", "02.08 - 16.08.2026"],
      ["Алексей Смертин", "16.08 - 20.08.2026"],
    ],
  },
  downtown: {
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Downtown Antalya",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Городской отель с зеленой территорией в центре Антальи. Расположен на второй береговой линии у подножья Таврских гор. Можно пешком осмотреть Старый город и район Калечи и отдохнуть в комфорте Ультра Все Включено.",
    ],
    scheduleTitle: "",
    schedule: [],
  },
  park: {
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Park Belek",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Отель расположен в Белеке рядом с сосновым лесом и пляжем. Гостей ждут семейный отдых в формате Ultra All Inclusive, доступ к развлечениям The Land of Legends и насыщенная программа Rixos Football Academy.",
    ],
    scheduleTitle: "Звездный состав:",
    schedule: [
      ["Евгений Алдонин", "01.05 - 10.05.2026"],
      ["Роман Павлюченко", "20.06 - 04.07.2026"],
      ["Павел Погребняк", "08.07 - 18.07.2026"],
      ["Евгений Алдонин", "12.08 - 25.08.2026"],
    ],
  },
};

function renderSchedule(items) {
  return items
    .map(([name, period]) => `
            <div class="hotels__schedule-item">
                <dt class="hotels__player">${name}</dt>
                <dd class="hotels__period">${period}</dd>
            </div>`)
    .join("");
}

export default function hotels(root = document) {
  const tabs = [...root.querySelectorAll("[data-hotel-tab]")];
  const date = root.querySelector("[data-hotel-date]");
  const title = root.querySelector("[data-hotel-title]");
  const subtitle = root.querySelector("[data-hotel-subtitle]");
  const description = root.querySelector("[data-hotel-description]");
  const scheduleTitle = root.querySelector("[data-hotel-schedule-title]");
  const schedule = root.querySelector("[data-hotel-schedule]");

  const setHotel = (key) => {
    const hotel = HOTELS[key];
    if (!hotel) return;

    tabs.forEach((tab) => {
      tab.classList.toggle("hotels__tab--active", tab.dataset.hotelTab === key);
    });

    date.textContent = hotel.date;
    title.textContent = hotel.title;
    subtitle.textContent = hotel.subtitle;
    description.innerHTML = hotel.description.map((text) => `<p>${text}</p>`).join("");
    scheduleTitle.textContent = hotel.scheduleTitle;
    scheduleTitle.hidden = hotel.schedule.length === 0;
    schedule.hidden = hotel.schedule.length === 0;
    schedule.innerHTML = renderSchedule(hotel.schedule);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setHotel(tab.dataset.hotelTab));
  });
}
