import {
  useReferenceManyInputController,
  UseReferenceManyInputControllerOptions
} from './useReferenceManyInputController';
import { styled } from '@mui/material/styles';
import { InputLabel, FormControl, FormHelperText, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import * as React from 'react';
import {
  ArrayInputContext,
  FieldTitle,
  CommonInputProps,
  InputHelperText,
  Labeled,
  LinearProgress,
  isRequired,
  ResourceContextProvider,
  useRecordContext,
  useResourceContext,
  useTranslate
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

/**
 * Use `<ReferenceManyInput>` in an `<Edit>` or `<Create>` view to edit one-to-many relationships,
 * e.g. to edit the variants of a product in the product edition view.
 *
 * @example
 * import {
 *     Edit,
 *     SimpleForm,
 *     TextInput,
 *     NumberInput,
 *     ReferenceInput,
 *     SelectInput,
 * } from 'react-admin';
 * import { ReferenceManyInput } from '@react-admin/ra-relationships';
 *
 * const ProductEdit = () => (
 *     <Edit mutationMode="optimistic">
 *         <SimpleForm>
 *             <TextInput source="name" />
 *             <NumberInput source="price" />
 *             <ReferenceInput source="category_id" reference="categories" />
 *             <ReferenceManyInput reference="variants" target="product_id">
 *                 <SimpleFormIterator inline>
 *                     <TextInput source="sku" />
 *                     <SelectInput source="size" choices={sizes} />
 *                     <SelectInput source="color" choices={colors} />
 *                     <NumberInput source="stock" defaultValue={0} />
 *                 </SimpleFormIterator>
 *             </ReferenceManyInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 */
export const ReferenceManyInput = ({
  margin,
  variant,
  disabled,
  children,
  className,
  helperText,
  label,
  sx,
  ...props
}: ReferenceManyInputProps) => {
  const record = useRecordContext(props);
  const resource = useResourceContext(props);
  const { fieldArray, error: fetchError, isLoading, temporaryFieldName } = useReferenceManyInputController(props);
  const { getFieldState, formState } = useFormContext();
  const { isDirty, invalid, error } = getFieldState(temporaryFieldName, formState);
  const translate = useTranslate();

  if (isLoading) {
    return (
      <Root fullWidth margin={margin} sx={sx} data-testid="loading">
        <Labeled label={label} source={props.reference} resource={resource}>
          <LinearProgress />
        </Labeled>
      </Root>
    );
  }
  if (fetchError) {
    return (
      <Root fullWidth margin={margin} sx={sx} data-testid="error">
        <Labeled label={label} source={props.reference} resource={resource}>
          <Typography sx={{ color: 'error.main' }}>
            {translate('ra-relationships.referenceManyInput.fetchError', {
              _: 'Error fetching references'
            })}
          </Typography>
        </Labeled>
      </Root>
    );
  }
  console.log('fieldArray', fieldArray);
  console.log('temporaryFieldName', temporaryFieldName);
  return (
    <ResourceContextProvider value={props.reference}>
      <Root
        fullWidth
        margin={margin}
        className={clsx('ra-input', `ra-input-${temporaryFieldName}`, className)}
        error={(isDirty || formState.isSubmitted) && invalid}
        sx={sx}
      >
        <InputLabel
          htmlFor={temporaryFieldName}
          className={ReferenceManyInputClasses.label}
          shrink
          error={(isDirty || formState.isSubmitted) && invalid}
        >
          <FieldTitle
            label={label}
            source={temporaryFieldName}
            resource={props.reference}
            isRequired={isRequired(props.validate)}
          />
        </InputLabel>
        <ArrayInputContext.Provider value={fieldArray}>
          {React.cloneElement(React.Children.only(children), {
            ...fieldArray,
            record,
            resource: props.reference,
            source: temporaryFieldName,
            variant,
            margin,
            disabled,
            disableReordering: true
          })}
        </ArrayInputContext.Provider>
        {!!((isDirty || formState.isSubmitted) && !!error) || helperText ? (
          <FormHelperText error={(isDirty || formState.isSubmitted) && !!error}>
            <InputHelperText
              touched={isDirty || formState.isSubmitted}
              error={error?.root?.message}
              helperText={helperText}
            />
          </FormHelperText>
        ) : null}
      </Root>
    </ResourceContextProvider>
  );
};

export interface ReferenceManyInputProps
  extends UseReferenceManyInputControllerOptions,
    Omit<CommonInputProps, 'source' | 'fullWidth' | 'defaultValue'> {
  children: React.ReactElement;
  className?: string;
  disabled?: boolean;
  sx?: SxProps;
}

const PREFIX = 'RaReferenceManyInput';

export const ReferenceManyInputClasses = {
  label: `${PREFIX}-label`
};

const Root = styled(FormControl, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root
})(({ theme }) => ({
  [`& .${ReferenceManyInputClasses.label}`]: {
    top: theme.spacing(-0.5),
    left: theme.spacing(-1.5)
  }
}));
