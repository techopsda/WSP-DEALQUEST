import postgrestRestProvider, { defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseResource } from '../types/SupabaseResource';
import { getResourceFromURL } from './getResourceFromURL';
import { getSchemaForResource } from './getSchemaForResource';
import { DataProvider, fetchUtils } from 'ra-core';

/**
 * A function that returns a dataProvider for Supabase.
 * @param instanceUrl The URL of the Supabase instance
 * @param apiKey The API key of the Supabase instance. Prefer the anonymous key.
 * @param supabaseClient The Supabase client
 * @returns A dataProvider for Supabase
 */

export const supabaseDataProvider = ({
  instanceUrl,
  apiKey,
  supabaseClient,
  resources
}: {
  instanceUrl: string;
  apiKey: string;
  supabaseClient: SupabaseClient;
  resources: SupabaseResource[];
}): DataProvider =>
  postgrestRestProvider({
    apiUrl: `${instanceUrl}/rest/v1`,
    httpClient: supabaseHttpClient({ apiKey, supabaseClient, resources }),
    defaultListOp: 'eq',
    primaryKeys: defaultPrimaryKeys,
    schema: defaultSchema
  });

/**
 * A function that returns a httpClient for Supabase. It handles the authentication.
 * @param apiKey The API key of the Supabase instance. Prefer the anonymous key.
 * @param supabaseClient The Supabase client
 * @returns A httpClient for Supabase
 */
export const supabaseHttpClient =
  ({
    apiKey,
    supabaseClient,
    resources
  }: {
    apiKey: string;
    supabaseClient: SupabaseClient;
    resources: SupabaseResource[];
  }) =>
  async (url: string, options: any = {}) => {
    const resource = getResourceFromURL(url);
    if (resource) {
      const schema = getSchemaForResource(resource, resources);
      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        options.user = {
          authenticated: true,
          // This ensures that users are identified correctly and that RLS can be applied
          token: `Bearer ${data.session.access_token}`
        };

        if (!options.headers) options.headers = new Headers({});
        // This ensures the app is authorized to access the supabase instance
        options.headers.set('apiKey', apiKey);
        // Set the schema header
        if (
          options?.method === 'DELETE' ||
          options?.method === 'POST' ||
          options?.method === 'PUT' ||
          options?.method === 'PATCH'
        ) {
          options.headers.set('Content-Profile', schema ?? 'public');
        } else {
          options.headers.set('Accept-Profile', schema ?? 'public');
        }
      }
    }
    return fetchUtils.fetchJson(url, options);
  };
