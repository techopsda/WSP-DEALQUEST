// @ts-nocheck
import { useCallback } from 'react';
import { useRegisterMutationMiddleware } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import getReferenceManyToManyFormField from './getReferenceManyToManyFormField';
import { useUpdateManyToManyReferences } from './useUpdateManyToManyReferences';

export const useRegisterManyToManyHandling = ({
  reference,
  through,
  using,
  perPage
}: {
  reference: string;
  resource: string;
  through: string;
  using: string;
  perPage: number;
}) => {
  const updateManyToManyReferences = useUpdateManyToManyReferences();
  const form = useFormContext();
  const updateManyToMany = useCallback(
    async (resource, params, options, next) => {
      const field = getReferenceManyToManyFormField({
        reference,
        resource,
        through
      });
      const values = form.getValues();
      const { onSuccess, ...otherOptions } = options;
      const { data, ...otherParams } = params;
      const { [field]: manyToManyField, ...sanitizedData } = data;

      const handleSuccess = async (data) => {
        await updateManyToManyReferences({
          newReferences: values[field],
          resourceId: data.id,
          through,
          using,
          perPage
        });

        if (onSuccess) {
          onSuccess(data);
        }
      };
      next(
        resource,
        {
          ...otherParams,
          data: sanitizedData
        },
        {
          ...otherOptions,
          onSuccess: handleSuccess
        }
      );
    },
    [form, reference, through, updateManyToManyReferences, using, perPage]
  );

  useRegisterMutationMiddleware(updateManyToMany);
};
