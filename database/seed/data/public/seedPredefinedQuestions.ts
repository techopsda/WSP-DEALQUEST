import { Questions } from './DealQuestQuestions';
import Papa from 'papaparse';
import { CSVQuestionAnswers } from '@/lib/questions/uploadQuestionsFromCSV';
import { PrismaClient } from '@prisma/client';

export const seedPredefinedQuestions = async (prismaClient: PrismaClient) => {
  console.log('Seeding predefined questions and answers...');

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

  const { data: csvQuestionAnswers } = Papa.parse(Questions, options);

  if (csvQuestionAnswers) {
    for (const csvQuestionAnswer of csvQuestionAnswers as CSVQuestionAnswers[]) {
      const existingQuestion = await prismaClient.question.findFirst({
        where: {
          name: csvQuestionAnswer.Question,
          year: parseInt(csvQuestionAnswer.Year)
        }
      });
      if (existingQuestion) continue;

      const question = await prismaClient.question.create({
        data: {
          name: csvQuestionAnswer.Question,
          year: parseInt(csvQuestionAnswer.Year),
          metadata: JSON.parse(csvQuestionAnswer?.Metadata) ?? undefined,
          type: csvQuestionAnswer.Type
        }
      });

      if (question) {
        const correctAnswer = await prismaClient.answer.create({
          data: { answer: csvQuestionAnswer.CorrectAnswer, question: { connect: { id: question.id } } }
        });

        if (correctAnswer) {
          await prismaClient.question.update({
            data: { correctAnswer: { connect: { id: correctAnswer.id } } },
            where: { id: question.id }
          });
        }

        const remainingAnswers = [csvQuestionAnswer.Answer2, csvQuestionAnswer.Answer3, csvQuestionAnswer.Answer4];

        for (const answer of remainingAnswers) {
          await prismaClient.answer.create({ data: { question: { connect: { id: question.id } }, answer } });
        }
      }
    }
  }
};
