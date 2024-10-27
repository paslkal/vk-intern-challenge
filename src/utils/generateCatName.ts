export default function generateCatName() {
  const prefixes = ["Мяу", "Бар", "Кос", "Пуш", "Си", "Кот", "Сне", "Лап"];
  const suffixes = ["ся", "ик", "ка", "чок", "чик", "уся", "шок", "чка"];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return prefix + suffix;
}
