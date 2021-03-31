import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import Link from '../Link';
import { TextStyleVariantsMap } from '../../foundation/Text';
import { breakpointsMedia } from '../../../../theme/utils/breakpointsMedia';
import { propToStyle } from '../../../../theme/utils/propToStyle';


const ButtonGhost = css`
  color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  background: transparent; 
`;

const ButtonDefault = css`
  color: white;
  background-color: ${function(props) {
    return get(props.theme, `colors.${props.variant}.color`)
  }};
  color: ${function(props) {
    return get(props.theme, `colors.${props.variant}.contrastText`)
  }};
`;

// eslint-disable-next-line import/prefer-default-export
const ButtonWrapper = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: 8px;
  ${TextStyleVariantsMap.smallestException}
  ${function(props) {
    // console.log('<Button />', props.variant, props.theme, get(props.theme, `colors.${props.variant}.color`));
    if(props.ghost) {
      return ButtonGhost;
    }
    return ButtonDefault
  }}
  transition: opacity ${({ theme }) => theme.transition};
  border-radius: ${(props) => props.theme.borderRadius};
  &:hover,
  &:focus {
    opacity: .5;
  }
  ${breakpointsMedia({
    xs: css`
      /* All devices */
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
     /* From md breakpoint */
     ${TextStyleVariantsMap.paragraph1}
    `,
  })}

&:disabled {
    cursor: not-allowed;
    opacity: .2;
  }
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `};
  ${propToStyle('margin')}
  ${propToStyle('display')}
`;

export function Button({ href, children, ...props }) {
  const hasHref = Boolean(href);
  const tag = hasHref ? Link : 'button';

  return (
    <ButtonWrapper
    as={tag}
    href={href}
    {...props}
  >
    {children}
  </ButtonWrapper>
  );
}

Button.defaultProps = {
  href: undefined,
};

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};
