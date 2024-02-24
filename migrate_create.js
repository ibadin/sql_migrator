const prompt = "Enter migrate name: ";
process.stdout.write(prompt);
for await (const line of console) {
  const date = new Date()
  const addZero = (value) => value <= 9 ? `0${value}`: `${value}`
  const fileName = `${date.getFullYear()}_${addZero(date.getMonth()+1)}_${addZero(date.getDay())}_${addZero(date.getHours())}${addZero(date.getMinutes())}${addZero(date.getSeconds())}_${line}`
  const input = Bun.file("./stubs/migration.stub.js")
  const output = Bun.file(`./migrations/${fileName}.js`)
  await Bun.write(output, input)
  break;
}
