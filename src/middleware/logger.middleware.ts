import morgan, { type StreamOptions } from "morgan";
import { ENV } from "../config/env.js";


const stream: StreamOptions = {
  write: (message: string) => {
    console.log(message.trim());
  },
};

const devFormat = ":method :url :status :response-time ms - :res[content-length]";
const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

const format = ENV.NODE_ENV === "production" ? prodFormat : devFormat;

export const httpLogger = morgan(format, { stream });