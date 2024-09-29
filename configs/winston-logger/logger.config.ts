import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { utilities } from 'nest-winston';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Timestamp를 추가하는 포맷
const appendTimestamp = winston.format((info, opts) => {
  if (opts.tz) {
    info.timestamp = format(
      toZonedTime(new Date(), opts.tz),
      "yyyy-MM-dd'T'HH:mm:ssXXX"
    );
  }
  return info;
});

// 일별 로그 회전 설정 함수
export const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: `./logs/${level}`, // 로그 파일 디렉토리
    filename: `%DATE%.${level}.log`, // 로그 파일 이름
    maxFiles: 30, // 최대 파일 보관 일수
    zippedArchive: true, // 오래된 로그를 압축
    format: winston.format.combine(
      winston.format.timestamp(),
      utilities.format.nestLike(process.env.NODE_ENV, {
        colors: false,
        prettyPrint: true,
      })
    ),
    colorize: true,
    handleExceptions: true,
    json: false,
  };
};

// 전체 로깅 설정을 정의하는 함수
export const loggerConfig = () => ({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'http' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        utilities.format.nestLike('MBTI_LENS', {
          prettyPrint: true, // 로그를 예쁘게 출력해줌
        })
      ),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('error')),
    new winstonDaily(dailyOptions('fatal')),
  ],
  format: winston.format.combine(
    appendTimestamp({ tz: 'Asia/Seoul' }),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} - ${info.level} ${info.message}`;
    })
  ),
});
