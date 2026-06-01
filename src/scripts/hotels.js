import {hostReactAppReady} from "../utils/utils.js";

const CDN = "https://b2ccdn.coral.ru/content/rixos football academy";

const HOTELS = {
  belek: {
    image: `${CDN}/rixos-premium-belek.webp`,
    lookupRegion: "RIXOS PREMIUM BELEK - THE LAND OF LEGENDS FREE ACCESS",
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Premium Belek",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Легендарный состав: Александр Соболев, Павел Погребняк, Александр Самедов, Роман Павлюченко и другие известные футболисты.",
      "Интенсив, дисциплина и атмосфера большого футбола.",
    ],
    scheduleTitle: "Звездный состав:",
    schedule: [
      ["Александр Соболев", ""],
      ["Павел Погребняк", ""],
      ["Александр Самедов", ""],
      ["Роман Павлюченко", ""],
    ],
  },
  tekirova: {
    image: `${CDN}/rixos-premium-tekirova.webp`,
    lookupRegion: "RIXOS PREMIUM TEKIROVA - THE LAND OF LEGENDS FREE ACCESS",
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Premium Tekirova",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Каждая смена — как отдельный мини-сбор с новым наставником: Роман Шишкин, Кирилл Набабкин, Александр Ширко, Владислав Радимов, Виталий Денисов и другие.",
    ],
    scheduleTitle: "Звездный состав:",
    schedule: [
      ["Роман Шишкин", ""],
      ["Кирилл Набабкин", ""],
      ["Александр Ширко", ""],
      ["Владислав Радимов", ""],
      ["Виталий Денисов", ""],
    ],
  },
  sungate: {
    image: `${CDN}/rixos-premium-sungate.webp`,
    lookupRegion: "RIXOS SUNGATE - THE LAND OF LEGENDS FREE ACCESS",
    date: "С 1 мая по 30 сентября 2026",
    title: "Rixos Premium Sungate",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Своя динамика и свои герои: Дмитрий Лоськов, Тарас Бурлак, Олег Корнаухов, Алексей Смертин и другие.",
    ],
    scheduleTitle: "Звездный состав:",
    schedule: [
      ["Дмитрий Лоськов", ""],
      ["Тарас Бурлак", ""],
      ["Олег Корнаухов", ""],
      ["Алексей Смертин", ""],
    ],
  },
  downtown: {
    image: `${CDN}/rixos-downtown.webp`,
    lookupRegion: "RIXOS DOWNTOWN ANTALYA - THE LAND OF LEGENDS FREE ACCESS",
    date: "С 1 июня по 30 сентября 2026",
    title: "Rixos Downtown Antalya",
    subtitle: "The Land of Legends Free Access 5*Deluxe",
    description: [
      "Городской отель с зеленой территорией в центре Антальи. Расположен на второй береговой линии у подножья Таврских гор. Можно пешком осмотреть Старый город и район Калечи и отдохнуть в комфорте Ультра Все Включено.",
    ],
    scheduleTitle: "",
    schedule: [],
  },
  park: {
    image: `${CDN}/park-belek.webp`,
    lookupRegion: "RIXOS PARK BELEK - THE LAND OF LEGENDS FREE ACCESS",
    date: "С 1 июня по 30 сентября 2026",
    title: "Rixos Park Belek",
    subtitle: "The Land of Legends Free Access 5*",
    description: [
      "Отель расположен в Белеке рядом с сосновым лесом и пляжем. Гостей ждут семейный отдых в формате Ultra All Inclusive, доступ к развлечениям The Land of Legends и насыщенная программа Rixos Football Academy.",
    ],
    scheduleTitle: "",
    schedule: [],
  },
};

function renderSchedule(items) {
  return items
    .map(
      ([name, period]) => `
            <div class="hotels__schedule-item">
                <dt class="hotels__player">${name}</dt>
                ${period ? `<dd class="hotels__period">${period}</dd>` : ""}
            </div>`,
    )
    .join("");
}

export default async function hotels(root = document) {
  await hostReactAppReady()

  const tabs = [...root.querySelectorAll("[data-hotel-tab]")];
  const media = root.querySelector("[data-hotel-media]");
  const date = root.querySelector("[data-hotel-date]");
  const title = root.querySelector("[data-hotel-title]");
  const subtitle = root.querySelector("[data-hotel-subtitle]");
  const description = root.querySelector("[data-hotel-description]");
  const scheduleTitle = root.querySelector("[data-hotel-schedule-title]");
  const schedule = root.querySelector("[data-hotel-schedule]");
  const cta = root.querySelector(".hotels__button");

  const setHotel = (key) => {
    const hotel = HOTELS[key];
    if (!hotel) return;

    tabs.forEach((tab) => {
      tab.classList.toggle(
        "hotels__tab--active",
        tab.dataset.hotelTab === key,
      );
    });

    media?.classList.toggle("hotels__media--empty", !hotel.image);
    if (media) {
      media.style.backgroundImage = hotel.image
        ? `url("${hotel.image}")`
        : "";
    }

    date.textContent = hotel.date;
    title.textContent = hotel.title;
    subtitle.textContent = hotel.subtitle;
    cta?.setAttribute("data-lookup-regions", hotel.lookupRegion || hotel.title);
    description.innerHTML = hotel.description
      .map((text) => `<p>${text}</p>`)
      .join("");
    scheduleTitle.textContent = hotel.scheduleTitle;
    scheduleTitle.hidden = hotel.schedule.length === 0;
    schedule.hidden = hotel.schedule.length === 0;
    schedule.innerHTML = renderSchedule(hotel.schedule);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setHotel(tab.dataset.hotelTab));
  });

  const activeTab = tabs.find((tab) =>
    tab.classList.contains("hotels__tab--active"),
  );
  if (activeTab) setHotel(activeTab.dataset.hotelTab);
}
