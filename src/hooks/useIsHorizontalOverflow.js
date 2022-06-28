import * as React from 'react'

export const useIsHorizontalOverflow = (ref, callback) => {
  const [isOverflow, setIsOverflow] = React.useState(undefined)

  React.useEffect(() => {
    const { current } = ref

    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth
      setIsOverflow(hasOverflow)

      if (callback) callback(hasOverflow)
    }

    setTimeout(() => {
      if (current) {
        trigger()
      }
    }, 50)
  }, [callback, ref])

  return isOverflow
}
