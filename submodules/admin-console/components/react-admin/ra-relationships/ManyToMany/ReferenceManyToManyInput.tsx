import * as React from 'react';
import { Children, ReactElement } from 'react';
import {
    ChoicesContextProvider,
    InputProps,
    RaRecord,
    ResourceContextProvider,
    SortPayload,
} from 'react-admin';

import {
    useReferenceManyToManyInputController,
    UseReferenceManyToManyInputControllerOptions,
} from './useReferenceManyToManyInputController';
import { UsingRegexp } from './constants';

/**
 * Allows to edit reference records through a relations table.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Allowing to pick the tags of a post using a SelectArrayInput
 *  <ReferenceManyToManyInput
 *      label="Posts"
 *      reference="posts"
 *      through="posts_tags"
 *      using={['tag_id', 'post_id']}
 *  >
 *      <SelectArrayInput optionText="name" />
 *  </ReferenceManyToManyInput>
 *
 * @example Allowing to pick the tags of a post using a CheckboxGroupInput
 *  <ReferenceManyToManyInput
 *      label="Posts"
 *      reference="posts"
 *      through="posts_tags"
 *      using={['tag_id', 'post_id']}
 *  >
 *      <CheckboxGroupInput optionText="name" />
 *  </ReferenceManyToManyInput>
 */
export const ReferenceManyToManyInput = <
    RecordType extends RaRecord = RaRecord
>({
    children,
    sort = { field: 'id', order: 'DESC' },
    ...props
}: ReferenceManyToManyInputProps<RecordType>) => {
    if (!props.using.match(UsingRegexp)) {
        throw new Error(
            '<ReferenceManyToManyInput> incorrect `using` props format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`'
        );
    }

    if (Children.count(children) !== 1) {
        throw new Error(
            '<ReferenceManyToManyInput> only accepts a single child'
        );
    }

    const controllerProps =
        useReferenceManyToManyInputController<RecordType>(props);

    return (
        <ResourceContextProvider value={controllerProps.resource}>
            <ChoicesContextProvider value={controllerProps}>
                {children}
            </ChoicesContextProvider>
        </ResourceContextProvider>
    );
};

export interface ReferenceManyToManyInputProps<
    RecordType extends RaRecord = RaRecord
> extends UseReferenceManyToManyInputControllerOptions<RecordType>,
        Omit<InputProps, 'source'> {
    children: ReactElement;
    filter?: Record<string, unknown>;
    perPage?: number;
    reference: string;
    sort?: SortPayload;
    through: string;
    using: string;
}
