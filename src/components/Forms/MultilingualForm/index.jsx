import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Tab, Col, Row, Nav } from 'react-bootstrap'
import '../Forms.scss'
import * as styles from './MultilingualForm.module.scss'

export const MultilingualForm = ({ onSubmit, data, validationSchema, formFields }) => {
  const intl = useIntl()

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(validationSchema),
  })

  // set initial values
  useEffect(() => {
    if (data.action === 'edit') {
      reset({ ...data.initValues })
    }
  }, [reset, data])

  return (
    <Suspense fallback={<div>...loading</div>}>
      <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
        {/* MULTILINGUAL FIELDS */}
        <Tab.Container id="left-tabs-example" defaultActiveKey="ru-RU">
          <Row className="w-100">
            <Nav className={styles.navbar}>
              <Nav.Item className={styles.nav_item}>
                <Nav.Link className={styles.nav_link} eventKey="ru-RU">
                  {intl.formatMessage({ id: 'global.russian' })}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.nav_item}>
                <Nav.Link eventKey="en-US">{intl.formatMessage({ id: 'global.english' })}</Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.nav_item}>
                <Nav.Link eventKey="ky-KG">{intl.formatMessage({ id: 'global.kyrgyz' })}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Tab.Content className="w-100">
              <Tab.Pane eventKey="ky-KG" className="w-100">
                {formFields.multilingualFields.ky_KG.map((el, idx) => {
                  return (
                    <div className="w-100" key={el.name + idx}>
                      {errors[el.name] && <span style={{ color: 'red' }}>{errors[el.name].message}</span>}
                      <label className="w-100" htmlFor={el.name}>{`${el.label} (${intl.formatMessage({ id: 'global.kyrgyz' })})`}</label>
                      <input
                        style={errors[el.name] && { border: '1px solid red' }}
                        name={el.name}
                        type="text"
                        placeholder={el.placeholder}
                        ref={register}
                      />
                    </div>
                  )
                })}
              </Tab.Pane>
              <Tab.Pane eventKey="ru-RU" className="w-100">
                {formFields.multilingualFields.ru_RU.map((el, idx) => {
                  return (
                    <div className="w-100" key={el.name + idx}>
                      {errors[el.name] && <span style={{ color: 'red' }}>{errors[el.name].message}</span>}
                      <label htmlFor={el.name} className="w-100">
                        {`${el.label} (${intl.formatMessage({ id: 'global.russian' })})`}
                      </label>
                      <input
                        style={errors[el.name] && { border: '1px solid red' }}
                        name={el.name}
                        type="text"
                        placeholder={el.placeholder}
                        ref={register}
                      />
                    </div>
                  )
                })}
              </Tab.Pane>
              <Tab.Pane eventKey="en-US" className="w-100">
                {formFields.multilingualFields.en_US.map((el, idx) => {
                  return (
                    <div className="w-100" key={el.name + idx}>
                      {errors[el.name] && <span style={{ color: 'red' }}>{errors[el.name].message}</span>}
                      <label className="w-100" htmlFor={el.name}>{`${el.label} (${intl.formatMessage({ id: 'global.english' })})`}</label>
                      <input
                        style={errors[el.name] && { border: '1px solid red' }}
                        name={el.name}
                        type="text"
                        placeholder={el.placeholder}
                        ref={register}
                      />
                    </div>
                  )
                })}
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>

        {/* STATIC FIELDS */}
        {formFields.staticFields.map((el, idx) => {
          if (el.type === 'select') {
            return (
              <div key={idx + el.name}>
                {errors[el.name] && <span style={{ color: 'red' }}>{errors[el.name].message}</span>}
                <label htmlFor={el.name}>{el.label}</label>
                <select name={el.name} aria-label="Default select example" ref={register}>
                  {el.options.map(el => (
                    <option value={el.id} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            )
          } else if (el.type === 'text' || el.type === 'number') {
            return (
              <>
                {errors[el.name] && <span style={{ color: 'red' }}>{errors[el.name].message}</span>}
                <label htmlFor={el.name}>{el.label}</label>
                <input name={el.name} type={el.type} placeholder={el?.placeholder || ''} ref={register} />
              </>
            )
          }
        })}

        <Button type="submit" className="btn-primary modal_btn">
          {intl.formatMessage({ id: 'global.save' })}
        </Button>
      </form>
    </Suspense>
  )
}
MultilingualForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
  validationSchema: PropTypes.object,
  formFields: PropTypes.object,
}
