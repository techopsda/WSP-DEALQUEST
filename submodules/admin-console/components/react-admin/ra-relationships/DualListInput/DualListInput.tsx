// @ts-nocheck

import * as React from 'react';
import { useCallback, useState } from 'react';
import {
  ChoicesProps,
  FieldTitle,
  InputHelperText,
  InputProps,
  sanitizeInputRestProps,
  useChoices,
  useChoicesContext,
  useInput,
  useTranslate
} from 'react-admin';
import { Button, FormControl, FormHelperText, InputLabel, List, ListSubheader, styled } from '@mui/material/styles';
import ArrowLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowRightIcon from '@mui/icons-material/ChevronRight';
import clsx from 'clsx';
import { DualListInputItem } from './DualListInputItem';
import { DualListInputSkeleton } from './DualListInputSkeleton';

/**
 * An Input component displaying two list of selected or available items.
 * It allows multiple selections and uses an array of objects for the options.
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'programming', name: 'Programming' },
 *    { id: 'lifestyle', name: 'Lifestyle' },
 *    { id: 'photography', name: 'Photography' },
 * ];
 * <DualListInput source="tags" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <DualListInput source="authors" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <DualListInput source="authors" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <DualListInput source="authors" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.tags.programming' },
 *    { id: 'lifestyle', name: 'myroot.tags.lifestyle' },
 *    { id: 'photography', name: 'myroot.tags.photography' },
 * ];
 */
export const DualListInput = (props: DualListInputProps = defaultProps) => {
  const {
    addButton,
    addButtonLabel = 'ra-relationships.duallistinput.select',
    availableItemsLabel = 'ra-relationships.duallistinput.availableItems',
    choices: choicesProp,
    className,
    dense = true,
    disableValue = 'disabled',
    format,
    helperText,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    label,
    onBlur,
    onChange,
    optionText = 'name',
    optionValue = 'id',
    parse,
    removeButton,
    removeButtonLabel = 'ra-relationships.duallistinput.unselect',
    resource: resourceProp,
    selectedItemsLabel = 'ra-relationships.duallistinput.selectedItems',
    source: sourceProp,
    translateChoice,
    validate,
    variant,
    ...rest
  } = props;

  const translate = useTranslate();

  const { allChoices, isLoading, source, resource } = useChoicesContext({
    choices: choicesProp,
    isLoading: isLoadingProp,
    isFetching: isFetchingProp,
    resource: resourceProp,
    source: sourceProp
  });

  const { getChoiceValue } = useChoices({
    optionText,
    optionValue,
    translateChoice
  });

  const {
    field,
    isRequired,
    fieldState: { error, invalid, isTouched, isDirty },
    formState: { isSubmitted }
  } = useInput({
    format,
    onBlur,
    onChange,
    parse,
    resource,
    source,
    validate,
    ...rest
  });

  // This handle the internal selection of items which can then be moved
  // from one list to the other
  const [selectedItems, setSelectedItems] = useState([]);
  const [availableSelectedItems, setAvailableSelectedItems] = useState([]);

  // Toggle the selection of a single item
  const handleToggleItemSelection = useCallback(
    (event, item): void => {
      setSelectedItems((currentSelectedItems) => {
        const isItemSelected = currentSelectedItems.some(
          (selectedItem) => getChoiceValue(selectedItem) === getChoiceValue(item)
        );

        if (isItemSelected) {
          return currentSelectedItems.filter((selectedItem) => getChoiceValue(selectedItem) !== getChoiceValue(item));
        } else {
          return [...currentSelectedItems, item];
        }
      });
    },
    [getChoiceValue]
  );

  // Toggle the selection of a single available item
  const handleToggleAvailableItemSelection = useCallback(
    (event, item): void => {
      setAvailableSelectedItems((currentSelectedItems) => {
        const isItemSelected = currentSelectedItems.some(
          (selectedItem) => getChoiceValue(selectedItem) === getChoiceValue(item)
        );

        if (isItemSelected) {
          return currentSelectedItems.filter((selectedItem) => getChoiceValue(selectedItem) !== getChoiceValue(item));
        } else {
          return [...currentSelectedItems, item];
        }
      });
    },
    [getChoiceValue]
  );

  const setInputValue = useCallback(
    (value: any[]): void => {
      field.onChange(value);
      setSelectedItems([]);
      setAvailableSelectedItems([]);
    },
    [field]
  );

  // Handler called when an item should be moved to the other list
  const handleMoveItem = useCallback(
    (event, choice) => {
      if ((field.value || []).some((value) => value === getChoiceValue(choice))) {
        setInputValue((field.value || []).filter((item) => item !== getChoiceValue(choice)));
        return;
      }

      setInputValue([...field.value, getChoiceValue(choice)]);
    },
    [getChoiceValue, field, setInputValue]
  );

  // Handler called when the selected items should be added to the input value
  const handleAddItems = useCallback(() => {
    const currentSet = new Set(field.value || []);
    availableSelectedItems.forEach((item) => currentSet.add(getChoiceValue(item)));
    setInputValue(Array.from(currentSet));
  }, [getChoiceValue, field, availableSelectedItems, setInputValue]);

  // Handler called when the selected items should be removed from the input value
  const handleRemoveItems = useCallback(() => {
    const newValue = (field.value || []).filter(
      (value) => !selectedItems.some((choice) => getChoiceValue(choice) === value)
    );
    setInputValue(newValue);
  }, [getChoiceValue, field, selectedItems, setInputValue]);

  return (
    <Root
      fullWidth
      margin={dense ? 'dense' : 'normal'}
      className={clsx('ra-input', `ra-input-${source}`, `ra-input-${variant}`, className)}
      error={(isDirty || isSubmitted) && invalid}
      {...sanitizeInputRestProps(rest)}
    >
      <InputLabel
        className={DualListInputClasses.label}
        htmlFor={source}
        shrink
        error={(isDirty || isSubmitted) && invalid}
      >
        <FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />
      </InputLabel>
      <div className={DualListInputClasses.main}>
        <div>
          <ListSubheader component="div" id="available-items-title" className={DualListInputClasses.listHeader}>
            {translate(availableItemsLabel, {
              _:
                availableItemsLabel === 'ra-relationships.duallistinput.availableItems'
                  ? 'Available items'
                  : availableItemsLabel
            })}
          </ListSubheader>
          {isLoading ? (
            <DualListInputSkeleton className={DualListInputClasses.list} />
          ) : (
            <List
              className={clsx(DualListInputClasses.list, DualListInputClasses.availableList)}
              dense={dense}
              disablePadding
              aria-labelledby="available-items-title"
              aria-multiselectable="true"
              role="listbox"
            >
              {allChoices.map((choice) =>
                !field.value.includes(getChoiceValue(choice)) ? (
                  <DualListInputItem
                    key={getChoiceValue(choice)}
                    choice={choice}
                    disableValue={disableValue}
                    onMove={handleMoveItem}
                    onToggleSelection={handleToggleAvailableItemSelection}
                    optionText={optionText}
                    optionValue={optionValue}
                    selected={availableSelectedItems.some(
                      (selectedItem) => getChoiceValue(selectedItem) === getChoiceValue(choice)
                    )}
                    translateChoice={translateChoice}
                  />
                ) : null
              )}
            </List>
          )}
        </div>
        <div className={DualListInputClasses.actions}>
          {React.isValidElement(addButton) ? (
            React.cloneElement(addButton, {
              onClick: handleAddItems,
              disabled: availableSelectedItems.length === 0
            })
          ) : (
            <Button
              className={clsx(DualListInputClasses.button, DualListInputClasses.addButton)}
              onClick={handleAddItems}
              endIcon={<ArrowRightIcon />}
              variant={addButton}
              disabled={availableSelectedItems.length === 0}
            >
              {translate(addButtonLabel, {
                _: addButtonLabel === 'ra-relationships.duallistinput.select' ? 'Select' : addButtonLabel
              })}
            </Button>
          )}
          {React.isValidElement(removeButton) ? (
            React.cloneElement(removeButton, {
              onClick: handleRemoveItems,
              disabled: selectedItems.length === 0
            })
          ) : (
            <Button
              className={clsx(DualListInputClasses.button, DualListInputClasses.removeButton)}
              onClick={handleRemoveItems}
              startIcon={<ArrowLeftIcon />}
              variant={removeButton}
              disabled={selectedItems.length === 0}
            >
              {translate(removeButtonLabel, {
                _: removeButtonLabel === 'ra-relationships.duallistinput.unselect' ? 'Unselect' : removeButtonLabel
              })}
            </Button>
          )}
        </div>
        <div>
          <ListSubheader component="div" id="selected-items-title" className={DualListInputClasses.listHeader}>
            {translate(selectedItemsLabel, {
              _:
                selectedItemsLabel === 'ra-relationships.duallistinput.selectedItems'
                  ? 'Selected items'
                  : selectedItemsLabel
            })}
          </ListSubheader>
          {isLoading ? (
            <DualListInputSkeleton className={DualListInputClasses.list} />
          ) : (
            <List
              className={clsx(DualListInputClasses.list, DualListInputClasses.selectedList)}
              dense={dense}
              disablePadding
              aria-labelledby="selected-items-title"
              aria-multiselectable="true"
              role="listbox"
            >
              {allChoices.map((choice) =>
                field.value.includes(getChoiceValue(choice)) ? (
                  <DualListInputItem
                    key={getChoiceValue(choice)}
                    choice={choice}
                    disableValue={disableValue}
                    onMove={handleMoveItem}
                    onToggleSelection={handleToggleItemSelection}
                    optionText={optionText}
                    optionValue={optionValue}
                    selected={selectedItems.some(
                      (selectedItem) => getChoiceValue(selectedItem) === getChoiceValue(choice)
                    )}
                    translateChoice={translateChoice}
                  />
                ) : null
              )}
            </List>
          )}
        </div>
      </div>
      <FormHelperText error={(isTouched || isSubmitted) && invalid}>
        <InputHelperText touched={isTouched || isSubmitted} error={error?.message} helperText={helperText} />
      </FormHelperText>
    </Root>
  );
};

const defaultProps = {
  defaultValue: [],
  source: ''
};

interface Props {
  addButton?: 'outlined' | 'contained' | 'text' | React.ReactElement;
  addButtonLabel?: string;
  availableItemsLabel?: string;
  choices?: any;
  className?: string;
  dense?: boolean;
  disableValue?: string;
  removeButton?: 'outlined' | 'contained' | 'text' | React.ReactElement;
  removeButtonLabel?: string;
  selectedItemsLabel?: string;
  source?: string;
  variant?: 'standard' | 'filled' | 'outlined' | React.ReactElement;
}

export type DualListInputProps = Props & Omit<ChoicesProps, 'choices'> & Omit<InputProps, 'source'>;

const PREFIX = 'RaDualListInput';

export const DualListInputClasses = {
  main: `${PREFIX}-main`,
  label: `${PREFIX}-label`,
  actions: `${PREFIX}-actions`,
  button: `${PREFIX}-button`,
  addButton: `${PREFIX}-addButton`,
  removeButton: `${PREFIX}-removeButton`,
  list: `${PREFIX}-list`,
  listHeader: `${PREFIX}-listHeader`,
  selectedList: `${PREFIX}-selectedList`,
  availableList: `${PREFIX}-availableList`
};

const Root = styled(FormControl, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root
})(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  [`& .${DualListInputClasses.main}`]: {
    position: 'relative',
    display: 'flex'
  },
  [`& .${DualListInputClasses.label}`]: {
    position: 'relative',
    zIndex: 2,
    transform: 'translate(12px, 0) scale(0.75)'
  },
  [`&.ra-input-outlined .${DualListInputClasses.label}`]: {
    transform: 'translate(14px, 0) scale(0.75)'
  },
  [`&.ra-input-standard .${DualListInputClasses.label}`]: {
    transform: 'translate(0, 0) scale(0.75)'
  },
  [`&.ra-input-filled .${DualListInputClasses.label}`]: {
    transform: 'translate(12px, 0) scale(0.75)'
  },
  [`& .${DualListInputClasses.actions}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  [`& .${DualListInputClasses.button}`]: {
    justifyContent: 'space-between'
  },
  [`& .${DualListInputClasses.listHeader}`]: {
    border: `solid 1px ${theme.palette.divider}`,
    borderBottom: 'none',
    borderRadius: `${parseFloat(theme.shape.borderRadius.toString())}px ${parseFloat(
      theme.shape.borderRadius.toString()
    )}px 0 0 `
  },
  [`& .${DualListInputClasses.list}`]: {
    minWidth: 256,
    height: 256,
    overflow: 'auto',
    border: `solid 1px ${theme.palette.divider}`
  },

  [`& .${DualListInputClasses.selectedList}`]: {
    backgroundColor: theme.palette.background.paper
  },
  [`& .${DualListInputClasses.availableList}`]: {
    backgroundColor: theme.palette.background.paper
  }
}));
