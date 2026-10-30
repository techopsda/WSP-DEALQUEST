import { CustomActionButtonDetailsProps } from './CustomActionButtonDetails';
import { CustomActionFunction } from './CustomActionFunction';
import { CustomActionOverrideComponent } from './CustomActionOverrideComponent';

export type CustomActionCore =
  | {
      useAction?: undefined;
      buttonDetails?: CustomActionButtonDetailsProps;
      overrideComponent: CustomActionOverrideComponent;
    }
  | {
      useAction: CustomActionFunction;
      buttonDetails: CustomActionButtonDetailsProps;
      overrideComponent?: undefined;
    };
