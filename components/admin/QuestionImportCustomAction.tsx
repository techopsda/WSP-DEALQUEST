import { CustomActionButton } from '@/submodules/admin-console/components/styling/CustomActionButton';
import { CustomActionButtonDetails } from '@/submodules/admin-console/components/styling/CustomActionButtonDetails';
import { CustomActionButtonDetailsProps } from '@/submodules/admin-console/types/Config/CustomActionButtonDetails';
import { CustomActionProps } from '@/submodules/admin-console/types/Config/CustomActionProps';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { ChangeEvent, useRef } from 'react';

export const QuestionImportCustomAction: React.FC<
  CustomActionProps & {
    onSelect: (
      event: ChangeEvent<HTMLInputElement>,
      supabase: SupabaseClient<Database, 'public'>
    ) => void | Promise<void>;
  }
> = ({ buttonDetails, onSelect }) => {
  const { label } = buttonDetails as CustomActionButtonDetailsProps;

  const { supabase } = useSupabase<'public'>('public');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef?.current?.click();

  return (
    <>
      <CustomActionButton label={label} onClick={handleClick}>
        <CustomActionButtonDetails {...(buttonDetails as CustomActionButtonDetailsProps)} />
      </CustomActionButton>

      <input className="hidden" ref={inputRef} type="file" onChange={(event) => onSelect(event, supabase)} />
    </>
  );
};
