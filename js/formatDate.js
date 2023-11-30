export const FormatDate = date => {
  const dateString = date.toString()

  const year = dateString.substring(0, 4)
  const month = dateString.substring(4)

  const formatedDate = `${year}-${month}`

  return formatedDate
}
