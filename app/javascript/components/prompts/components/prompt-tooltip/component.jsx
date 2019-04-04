import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/ui/button';
import Icon from 'components/ui/icon';

import closeIcon from 'assets/icons/close.svg';

import './styles.scss';

class PromptTooltip extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      index,
      step,
      backProps,
      closeProps,
      primaryProps,
      tooltipProps,
      size,
      title
    } = this.props;
    const { content, link } = step;
    const stepNum = index + 1;
    const isLastStep = stepNum === size;

    return (
      <div className="c-prompt-tooltip" {...tooltipProps}>
        <button className="step-close" {...closeProps}>
          <Icon className="step-close-btn" icon={closeIcon} />
        </button>
        <div className="step-title">{`${title} · ${index + 1}/${size}`}</div>
        <div className="step-content">{content}</div>
        <div className="step-btns">
          {index !== 0 && (
            <button className="step-nav-btn" {...backProps}>
              BACK
            </button>
          )}
          {isLastStep ? (
            <button className="step-nav-btn" {...closeProps}>
              CLOSE
            </button>
          ) : (
            <button className="step-nav-btn" {...primaryProps}>
              NEXT
            </button>
          )}
        </div>
        {link && (
          <Button theme="theme-button-small" extLink={link}>
            learn how
          </Button>
        )}
      </div>
    );
  }
}

PromptTooltip.propTypes = {
  closeProps: PropTypes.object,
  backProps: PropTypes.object,
  step: PropTypes.object,
  primaryProps: PropTypes.object,
  isLastStep: PropTypes.bool,
  index: PropTypes.number,
  numOfSteps: PropTypes.number,
  tooltipProps: PropTypes.object,
  size: PropTypes.number,
  title: PropTypes.string
};

export default PromptTooltip;
