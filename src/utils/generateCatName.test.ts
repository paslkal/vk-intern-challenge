import generateCatName from "./generateCatName";


describe('Генерирование случайной клички', () => {
  test('Возвращается строка', () => {
    expect(typeof generateCatName()).toBe('string')
  })

  test('Возвращается не пустая строка', () => {
    expect(generateCatName().length).toBeGreaterThan(1)
  })

  test('Кличка на русском языке', () => {
    const valideCharCodes = [
      ...Array('Я'.charCodeAt(0) - 'А'.charCodeAt(0) + 1).keys(),
      ...Array('я'.charCodeAt(0) - 'а'.charCodeAt(0) + 1).keys()
    ].map(i => i + 'A'.charCodeAt(0))

    const isValid = (catName: string) => 
      [...catName].every(char => 
        valideCharCodes.indexOf(char.charCodeAt(0))
      ) 

    expect(isValid(generateCatName())).toBe(true)
  })
})