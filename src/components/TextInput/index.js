import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import formValidation from '../../utils/formValidation'
import styles from './TextInput.css'

class TextInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    validation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ]),
    errorMessage: PropTypes.string,
    errorMessageClassName: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any
  };

  static defaultProps = {
    placeholder: '',
    disabled: false,
    required: false,
    type: 'text',
    debounce: 750
  };

  constructor(props, context) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
    this.emitDelayedChange = this.emitDelayedChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.state = {
      isValid: this.doValidation(props.value).isValid,
      blurRanOnce: false,
      // Timeout ID
      tid: void 0, // eslint-disable-line
    }
  }
  componentDidMount() {
    setTimeout(() => {
      // sometimes value is set via the DOM. This updates initial state
      if (!this.state.value) {
        const value = this.refs.input.value
        if (value) {
          const isValid = this.doValidation(value).isValid
          console.log(`isValid ${value}`, isValid)
          this.setState({
            isValid: this.doValidation(value).isValid,
            value
          })
          console.log('VALUE', value)
        }
      }
    }, 0)
  }
  shouldComponentUpdate(nextProps, nextState) {
    const keys = Object.keys(nextProps)
    const { value, isValid } = this.state

    // if value invalid, always update
    if (!isValid) {
      return true
    }

    // We only consider the search term from the state
    if (value !== nextState.value) {
      return true
    }
    // We render if anything in the properties changed
    // > Different number of properties
    if (keys.length !== Object.keys(this.props).length) {
      return true
    }

    // > Different properties
    const changed = keys.some(key => nextProps[key] !== this.props[key])

    if (changed) {
      return true
    }

    return false
  }
  componentWillUnmount() {
    const { tid } = this.state
    window.clearTimeout(tid)
  }
  doValidation(value) {
    const { validation, errorMessage } = this.props
    const defaultMessage = 'Invalid Value'
    // console.log('validation', validation)
    // console.log('do validation', value)
    // console.log('formValidation', formValidation)
    if (typeof validation === 'string' && formValidation[validation]) {
      // check pattern in validations formValidation obj
      return {
        isValid: formValidation[validation].pattern.test(value),
        errorMessage: formValidation[validation].message || defaultMessage
      }
    } else if (typeof validation === 'object' && validation.pattern) {
      // if validation object is used
      return {
        isValid: validation.pattern.test(value),
        errorMessage: validation.message || defaultMessage
      }
    } else if (validation instanceof RegExp) {
      // check regex passed in
      return {
        isValid: validation.test(value),
        errorMessage: errorMessage || defaultMessage
      }
    } else if (typeof validation === 'function') {
      // do custom function for validation
      return {
        isValid: validation(value),
        errorMessage: errorMessage || defaultMessage
      }
    }
    // default field is valid if no validation
    return {
      isValid: true,
      errorMessage: ''
    }
  }
  handleChange(event) {
    const { tid } = this.state

    if (tid) {
      clearTimeout(tid)
    }

    this.setState({
      value: event.target.value,
      tid: setTimeout(this.emitDelayedChange, 800),
    })
  }
  emitDelayedChange() {
    const { value } = this.state
    const { onChange } = this.props

    const inputData = this.doValidation(value)

    this.setState({
      tid: void 0,  // eslint-disable-line
      isValid: inputData.isValid,
      errorMessage: inputData.errorMessage
    }, this.doVisibleValidation(inputData.isValid))

    if (onChange) {
      // because debounce, fake event is passed back
      const fakeEvent = {}
      fakeEvent.target = this.refs.input
      onChange(fakeEvent, value, inputData.isValid)
    }
  }
  doVisibleValidation(isInputValid) {
    const { validation } = this.props
    if (validation && !isInputValid) {
      // has validation and is not valid!
      this.refs.input.style.border = '1px solid red'
    } else if (validation && isInputValid) {
      // has validation and is valid!
      this.refs.input.style.border = '1px solid green'
    }
  }
  handleFocus(event) {
    const { onFocus } = this.props
    const { isValid } = this.state

    // this.outlineInput()
    if (onFocus) {
      onFocus(event, event.target.value, isValid)
    }
  }
  handleBlur(event) {
    const { onBlur } = this.props
    const { isValid } = this.state
    if (onBlur) {
      onBlur(event, event.target.value, isValid)
    }
    // console.log('this.state.', this.state)
    // console.log('this.state.blurRanOnce', this.state.blurRanOnce)
    // console.log('event.target.value', event.target.value)
    // Set blur state to show validations
    if (!this.state.blurRanOnce && event.target.value) {
      // capture focus if input wrong
      this.setState({
        blurRanOnce: true
      }, this.captureFocusWhenInvalid())
    }
  }
  captureFocusWhenInvalid() {
    if (!this.state.isValid) {
      // causes back form behavoir
      // this.focus()
    }
  }
  showValidation() {
    const { isValid, errorMessage } = this.state
    const { errorMessageClassName } = this.props
    if (isValid) {
      return null
    } else if (this.state.blurRanOnce) {
      const classes = cx(styles.validation, errorMessageClassName)
      return (
        <div className={classes}>
          {errorMessage}
        </div>
      )
    }
  }
  blur() {
    this.refs.input.blur()
  }

  focus() {
    this.refs.input.focus()
  }

  render() {
    const {
      className,
      disabled,
      required,
      validation, // eslint-disable-line
      errorMessageClassName, // eslint-disable-line
      debounce, // eslint-disable-line
      type,
      value,
      ...others
    } = this.props

    const props = {
      ...others,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      ref: 'input',
      role: 'input',
      name: others.name || others.id || others.ref || formatName(others.placeholder),
      disabled,
      required,
      type,
      value,
      className: cx(className, styles.input),
    }
    return (
      <div className={styles.inputWrapper}>
        {this.showValidation()}
        <input {...props} />
      </div>
    )
  }
}

function formatName(name) {
  return name.replace(/\s|-/g, '_')
}

export default TextInput
