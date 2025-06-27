const prompt = "Enter migrate name: ";
process.stdout.write(prompt);
for await (const line of console) {
  const date = new Date()
  const addZero = (value) => value <= 9 ? `0${value}`: `${value}`
  const fileName = `${date.getUTCFullYear()}_${addZero(date.getUTCMonth()+1)}_${addZero(date.getUTCDay())}_${addZero(date.getUTCHours())}${addZero(date.getUTCMinutes())}${addZero(date.getUTCSeconds())}_${line}`
  const input = Bun.file(__dirname + "/stubs/migration.stub.js")
  const output = Bun.file(__dirname + `/migrations/${fileName}.js`)
  await Bun.write(output, input)
  break;
}
