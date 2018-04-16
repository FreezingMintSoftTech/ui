import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import RfFormLabel from '../FormLabel/RfFormLabel';

const TextArea = (props) => {
  const {
    className,
    id,
    labelText,
    hideLabel,
    onChange,
    onClick,
    input,
    invalid,
    invalidText,
    ...other
  } = props;
  const textareaProps = {
    id,
    onChange: evt => {
      if (!other.disabled) {
        onChange(evt);
      }
    },
    onClick: evt => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
  };

  const textareaClasses = classNames('wfp--text-area', className);
  const labelClasses = classNames('wfp--label', {
    'wfp--visually-hidden': hideLabel,
  });

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;

  const error = invalid ? (
    <div className="wfp--form-requirement">{invalidText}</div>
  ) : null;

  const inputElement = invalid ? (
    <textarea
      {...other}
      {...textareaProps}
      className={textareaClasses}
      data-invalid
    />
  ) : (
    <textarea {...input} {...textareaProps} className={textareaClasses} />
  );

  return (
    <div className="wfp--form-item">
      <RfFormLabel {...props} /> 
      {inputElement}
      {error}
    </div>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  input: PropTypes.object,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  hideLabel: PropTypes.bool,
};

TextArea.defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  placeholder: '',
  rows: 4,
  cols: 50,
  invalid: false,
  invalidText: '',
};

export default TextArea;
