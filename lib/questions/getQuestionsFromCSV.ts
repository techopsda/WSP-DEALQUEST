import { ChangeEvent } from 'react';
import * as Papa from 'papaparse';
import { CSVQuestionAnswers, uploadQuestionsFromCSV } from './uploadQuestionsFromCSV';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getQuestionsFromCSV = (
  event: ChangeEvent<HTMLInputElement>,
  supabase: SupabaseClient<Database, 'public'>
) => {
  if (event.target.files) {
    const reader = new FileReader();

    reader.addEventListener('load', async (e) => {
      try {
        if (e.target?.result) {
          const transformValue = (value: string) => {
            if (value === 'null') return null;
            else if (value === 'true') return true;
            else if (value === 'false') return false;
            else return value;
          };

          const transformHeader = (value: string) => {
            return value.replace(/[^a-zA-Z0-9 ]/g, '');
          };

          const options = {
            header: true,
            skipEmptyLines: true,
            transform: (value: string) => transformValue(value),
            transformHeader: (value: string) => transformHeader(value)
          };

          const { data } = Papa.parse(e.target.result as string, options);

          if (data) {
            await uploadQuestionsFromCSV(data as CSVQuestionAnswers[], supabase);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
    reader.readAsBinaryString(event.target.files[0]);
  }
};
