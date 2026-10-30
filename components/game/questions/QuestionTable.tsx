import { Question } from '@/types/database';

interface QuestionTableProps {
  question: Question;
}

export const QuestionTable: React.FC<QuestionTableProps> = ({ question }) => {
  const metadataTable = question?.metadata as { value: string }[][];

  return (
    <div className="overflow-x-auto">
      <table className="[ dqTable ] w-full">
        <tbody>
          {metadataTable?.map((metadataRow, index) => {
            return (
              <tr key={index}>
                {metadataRow?.map((metadataCell, index) => {
                  return (
                    <td key={index}>
                      <p className="px-6">{metadataCell?.value == '' ? <br /> : metadataCell?.value}</p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
