import {
  Serializable,
  DateFormatHandling,
  LogLevels,
  DefaultValueHandling,
  NullValueHandling,
  ReferenceLoopHandling,
  MissingMemberHandling,
  SnakeCaseNamingStrategy,
} from 'ts-serializable';

Serializable.defaultSettings = {
  namingStrategy: new SnakeCaseNamingStrategy(),
  dateFormatHandling: DateFormatHandling.IsoDateFormat,
  missingMemberHandling: MissingMemberHandling.Ignore,
  referenceLoopHandling: ReferenceLoopHandling.Serialize,
  nullValueHandling: NullValueHandling.Include,
  defaultValueHandling: DefaultValueHandling.Ignore,
  logLevel: LogLevels.Warning,
};

export class ModelFactory {
  static create<T extends Serializable>(Model: new () => T, data: Object): T {
    return new Model().fromJSON(data);
  }
}
