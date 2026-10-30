import { QuestionImportCustomAction } from '@/components/admin/QuestionImportCustomAction';
import { getQuestionsFromCSV } from '@/lib/questions/getQuestionsFromCSV';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export const Question: ResourceConfig = {
  customActions: [
    {
      overrideComponent: (props) => <QuestionImportCustomAction {...props} onSelect={getQuestionsFromCSV} />,
      buttonDetails: {
        label: 'Import Question CSV',
        icon: (props) => <QuestionMarkCircleIcon {...props} />
      }
    }
  ]
};
