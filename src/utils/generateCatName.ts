export default function generateCatName() {
  const names = [
    "Мурзик",
    "Симба",
    "Люси",
    "Барсик",
    "Том",
    "Котя",
    "Оливия",
    "Чарли",
    "Снежок",
    "Милка",
    "Тигра",
    "Пусик",
    "Багира",
    "Луна",
    "Кеша",
    "Зефир",
    "Боня",
    "Тиша",
    "Снежинка",
    "Котяра"
  ];

  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex]
}
