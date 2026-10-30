// @ts-nocheck

import {
  RaRecord,
  ResourceDefinition,
  useCreatePath,
  useGetResourceLabel,
  useResourceDefinitions,
  useTranslate,
  useBasename
} from 'react-admin';

import { BreadcrumbPath } from './BreadcrumbItem';

export type BreadcrumbPathMap = { [key: string]: BreadcrumbPath };

/**
 * Internal hook that builds a map of paths from a resource definition
 *
 * The output map has the following form:
 * {
 *  songs: { label: 'Songs', to: '/songs' },
 *  songs.create: { label: 'Create Song', to: '/songs/create' },
 *  songs.show: {
 *    label: ({ record }) => `Show #${record.id}`,
 *    to: ({ record }) => `/${record.id}/show`
 *  }
 *  songs.edit: {
 *    label: ({ record }) => `Edit #${record.id}`,
 *    to: ({ record }) => `/${record.id}/edit`
 *  }
 * }
 */
export const useBuildResourceBreadcrumbPaths = () => {
  const getResourceLabel = useGetResourceLabel();
  const translate = useTranslate();
  const createPath = useCreatePath();
  const basename = useBasename();

  return (resource: ResourceDefinition) => {
    const resourcePaths = {};
    const resourceLabelPlural = getResourceLabel(resource.name, 2);
    const resourceLabelSingular = getResourceLabel(resource.name, 1);

    resourcePaths[resource.name] = {
      label: resourceLabelPlural,
      to: `${basename}/${resource.name}`
    };

    resourcePaths[`${resource.name}.create`] = {
      label: !resource.hasList
        ? translate('ra.page.create', {
            name: resourceLabelSingular
          })
        : translate('ra.action.create'),
      to: createPath({
        resource: resource.name,
        type: 'create'
      })
    };

    resourcePaths[`${resource.name}.edit`] = {
      label: ({ record }: { record: RaRecord }): string =>
        !record
          ? translate('ra.action.edit')
          : !resource.hasList
          ? translate('ra.page.edit', {
              name: resourceLabelSingular,
              id: record.id,
              record
            })
          : `#${record.id}`,
      to: ({ record }): string =>
        record &&
        createPath({
          resource: resource.name,
          id: record.id,
          type: 'edit'
        })
    };

    resourcePaths[`${resource.name}.show`] = {
      label: ({ record }): string =>
        !record
          ? translate('ra.action.show')
          : !resource.hasList
          ? translate('ra.page.show', {
              name: resourceLabelSingular,
              id: record.id,
              record
            })
          : `#${record.id}`,
      to: ({ record }): string =>
        record &&
        createPath({
          resource: resource.name,
          id: record.id,
          type: 'show'
        })
    };

    return resourcePaths;
  };
};

/**
 * This hook is used internally to build a resource breadcrumb path map
 * The result is usually used by <ResourceBreadcrumbItems /> to render a BreadcrumbItem tree from current resources
 *
 * @see ResourceBreadcrumbItems
 */
export const useResourcesBreadcrumbPaths = (selectedResources?: string[]): BreadcrumbPathMap => {
  const resources = useResourceDefinitions();
  const buildResourceBreadcrumbPaths = useBuildResourceBreadcrumbPaths();

  return Object.values(resources)
    .filter((resource) => !selectedResources || selectedResources.includes(resource.name))
    .map((resource) => ({
      ...resource,
      hasCreate: !!resource.hasCreate,
      hasEdit: !!resource.hasEdit,
      hasList: !!resource.hasList,
      hasShow: !!resource.hasShow
    }))
    .reduce(
      (resourcesPaths, resource) => ({
        ...resourcesPaths,
        ...buildResourceBreadcrumbPaths(resource)
      }),
      {}
    );
};
