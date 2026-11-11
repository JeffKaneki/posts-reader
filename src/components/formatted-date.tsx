const formatter = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

type FormattedDateProps = {
  value: string | undefined
  className?: string
}

function FormattedDate({ value, className }: FormattedDateProps) {
  if (!value) {
    return null
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return <time className={className} dateTime={value}>{formatter.format(date)}</time>
}

export default FormattedDate
