import { Event } from "@/api/events/types";
import { EventCard } from "@/components/EventCard";
import { Badge } from "@/components/ui/badge";

const events: Event[] = [
  {
    id: "1",
    name: "Koncert Rockowy",
    shortDescription: "Niezapomniany wieczór z rockową muzyką.",
    longDescription:
      "Dołącz do nas na niesamowitym koncercie rockowym z udziałem znanych zespołów. Będzie to wieczór pełen energii i emocji!",
    price: 50,
    coinReward: 100,
    image: "/src/assets/event.png",
    dateFrom: "2023-10-01T20:00:00Z",
    dateTo: "2023-10-01T23:00:00Z",
    location: {
      id: "1",
      name: "Sala Koncertowa",
      address: "ul. Muzyczna 10, Warszawa",
    },
  },
  {
    id: "2",
    name: "Spektakl Teatralny",
    shortDescription: "Klasyczny dramat w nowoczesnej interpretacji.",
    longDescription:
      "Zapraszamy na wyjątkowy spektakl teatralny, który przeniesie Cię w świat wielkich emocji i niezapomnianych przeżyć.",
    price: 75,
    coinReward: 150,
    image: "/src/assets/event.png",
    dateFrom: "2023-10-05T19:00:00Z",
    dateTo: "2023-10-05T21:30:00Z",
    location: {
      id: "2",
      name: "Teatr Wielki",
      address: "pl. Teatralny 1, Warszawa",
    },
  },
  {
    id: "3",
    name: "Warsztat Fotograficzny",
    shortDescription: "Naucz się tajników fotografii portretowej.",
    longDescription:
      "Praktyczny warsztat dla początkujących i średnio zaawansowanych fotografów. Poznaj sekrety profesjonalnej fotografii.",
    price: 120,
    coinReward: 200,
    image: "/src/assets/event.png",
    dateFrom: "2023-10-08T10:00:00Z",
    dateTo: "2023-10-08T16:00:00Z",
    location: {
      id: "3",
      name: "Studio Foto",
      address: "ul. Kreatywna 5, Kraków",
    },
  },
  {
    id: "4",
    name: "Festiwal Jazzowy",
    shortDescription: "Trzydniowy festiwal najlepszego jazzu.",
    longDescription:
      "Największe wydarzenie jazzowe roku! Występy światowej klasy muzyków, jam sessions i niepowtarzalna atmosfera.",
    price: 200,
    coinReward: 300,
    image: "/src/assets/event.png",
    dateFrom: "2023-10-15T18:00:00Z",
    dateTo: "2023-10-17T23:00:00Z",
    location: {
      id: "4",
      name: "Park Kulturowy",
      address: "ul. Jazzowa 25, Gdańsk",
    },
  },
  {
    id: "5",
    name: "Wystawa Sztuki Współczesnej",
    shortDescription: "Przegląd najnowszych trendów w sztuce.",
    longDescription:
      "Odkryj fascynujący świat sztuki współczesnej. Prace znanych i wschodzących artystów z całego świata.",
    price: 30,
    coinReward: 80,
    image: "/src/assets/event.png",
    dateFrom: "2025-10-10T10:00:00Z",
    dateTo: "2025-10-10T18:00:00Z",
    location: {
      id: "5",
      name: "Galeria Moderna",
      address: "ul. Artystyczna 15, Wrocław",
    },
  },
  {
    id: "6",
    name: "Konferencja Tech Summit Konferencja Tech Summi Tech Summi",
    shortDescription: "Przyszłość technologii w jednym miejscu.",
    longDescription:
      "Spotkanie z liderami branży technologicznej. Prezentacje, panele dyskusyjne i networking z ekspertami IT.",
    price: 300,
    coinReward: 400,
    image: "/src/assets/event.png",
    dateFrom: "2025-06-05T09:00:00Z",
    dateTo: "2025-06-05T17:00:00Z",
    location: {
      id: "6",
      name: "Centrum Konferencyjne",
      address: "ul. Innowacyjna 50, Poznań",
    },
  },
];

export default function Home() {
  return (
    <>
      <div className="space-y-6">
        {events.map((event, i) => (
          <EventCard event={event} key={i} />
        ))}
      </div>
    </>
  );
}
