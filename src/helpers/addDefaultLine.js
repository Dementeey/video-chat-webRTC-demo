export default arr => {
  const minLines = 11

  if (arr.length > minLines) {
    return arr
  }

  const defaultLines = Array.from({ length: minLines - arr.length }).map(() => ({
    id: Math.random(),
    name: ''
  }))

  return [...arr, ...defaultLines]
}
