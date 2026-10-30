import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en_GB';
import { defineAnswerFactory, defineQuestionFactory } from '../../../generated/factories';
import _ from 'lodash';

export const seedQuestionsAndAnswers = async (prismaClient: PrismaClient) => {
  console.log('Seeding question...');

  for (let x = 1; x <= 20; x++) {
    const question = await defineQuestionFactory().create({
      name: faker.lorem.words(),
      year: 0
    });

    console.log('Seeding answers...');
    const answers: { id: string }[] = [];
    for (let i = 0; i < 4; i++) {
      answers.push(
        await defineAnswerFactory({} as any).create({
          answer: faker.lorem.word(),
          question: { connect: { id: question?.id } }
        })
      );
    }

    const correctAnswer = _.sample(answers)?.id;

    console.log('Updating question with correctAnswerId...');
    await prismaClient.question.update({
      where: { id: (question as any).id },
      data: { correctAnswerId: correctAnswer ?? answers[0].id }
    });
  }
};
