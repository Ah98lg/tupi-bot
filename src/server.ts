import { create, Whatsapp } from 'venom-bot';
import {
  botMessages,
  firstStepAnswers,
  firstStepOptions,
  optionsNumber,
} from './mocks';

create({
  session: 'Tupi Bot',
  multidevice: true,
})
  .then((client: any) => start(client))
  .catch((erro: any) => {
    console.log(erro);
  });

var attendanceStep = 0;

async function start(client: Whatsapp) {
  await client.onAnyMessage(
    async (message: {
      body: string;
      from: any;
      id: string;
      notifyName: string;
      isGroupMsg: boolean;
    }) => {
      if (message.body.toLowerCase() === 'menu') {
        attendanceStep = 0;
      }
      if (
        (message.body.toLowerCase() === 'test' ||
          message.body.toLowerCase() === 'menu') &&
        !message.isGroupMsg &&
        attendanceStep === 0
      ) {
        await client
          .sendText(
            message.from,
            `*Olá ${message.notifyName}, seja bem vindo a Box Potiguar!* \n\n${botMessages.welcome}\n\n${firstStepOptions.optionOne}\n${firstStepOptions.optionTwo}\n${firstStepOptions.optionThree}\n${firstStepOptions.optionFour}`,
          )
          .then(() => {
            attendanceStep++, console.log(attendanceStep);
          })
          .catch((error) => console.log(error, 'reply'));
      }
      if (attendanceStep === 1 && optionsNumber.includes(message.body)) {
        await client
          .sendText(message.from, firstStepAnswers[Number(message.body)])
          .then(() => {
            attendanceStep++, console.log(attendanceStep);
            return;
          });
      }
    },
  );
}

// 558481131283-1468891463 id coachs potiguar
