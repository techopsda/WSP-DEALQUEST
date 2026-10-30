// @ts-nocheck
import * as React from 'react';
import { HTMLAttributes, ReactElement } from 'react';
import { useTimeout, useTranslate } from 'react-admin';
import { styled } from '@mui/material/styles';

export const DualListInputSkeleton = (props: HTMLAttributes<HTMLDivElement>): ReactElement => {
  const translate = useTranslate();
  const oneSecondHasPassed = useTimeout(1000);

  if (oneSecondHasPassed) {
    return <Root aria-disabled="true" aria-label={translate('ra.message.loading')} {...props} />;
  }
  return null;
};

const Root = styled('div', {
  name: 'RaDualListInputSkeleton',
  overridesResolver: (props, styles) => styles.root
})(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  borderStyle: 'none'
}));
