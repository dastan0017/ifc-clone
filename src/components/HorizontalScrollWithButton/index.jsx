import { useState, useRef, useEffect } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from 'icons'
import { Row } from 'react-bootstrap'
import { useIsHorizontalOverflow } from 'hooks'
import PropTypes from 'prop-types'
import styles from './HorizontalScrollWithButton.module.scss'

export const HorizontalScrollWithButton = ({ children }) => {
  const scrl = useRef(null)

  const [scrollX, setscrollX] = useState(0) // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false) // For detecting end of scrolling

  const isOverflow = useIsHorizontalOverflow(scrl)

  const slide = shift => {
    scrl.current.scrollLeft += shift
    setscrollX(scrollX + shift) // Updates the latest scrolled postion

    //For checking if the scroll has ended
    if (Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth) {
      setscrolEnd(true)
    } else {
      setscrolEnd(false)
    }
  }

  //This will check scroll event and checks for scroll end
  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft)
    if (Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth) {
      setscrolEnd(true)
    } else {
      setscrolEnd(false)
    }
  }

  useEffect(() => {
    // Check width of the scollings
    if (scrl.current && scrl?.current?.scrollWidth === scrl?.current?.offsetWidth && scrollX !== 0) {
      setscrolEnd(true)
    } else {
      setscrolEnd(false)
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth])

  return (
    <Row className={styles.container}>
      {isOverflow ? (
        <>
          <button disabled={scrollX === 0} className={`${styles.arrow_btn} ${scrollX === 0 && styles.arrow_disabled}`} onClick={() => slide(-200)}>
            <ArrowLeftIcon />
          </button>
          <Row ref={scrl} onScroll={scrollCheck} className={styles.scrollable_container}>
            {children}
          </Row>
          <button className={`${styles.arrow_btn} ${scrolEnd && styles.arrow_disabled}`} onClick={() => slide(+200)} disabled={scrolEnd}>
            <ArrowRightIcon />
          </button>
        </>
      ) : (
        <Row ref={scrl} onScroll={scrollCheck} className={`${styles.scrollable_container} w-100`}>
          {children}
        </Row>
      )}
    </Row>
  )
}
HorizontalScrollWithButton.propTypes = {
  children: PropTypes.any,
}
