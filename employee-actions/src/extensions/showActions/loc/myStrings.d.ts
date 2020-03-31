declare interface IShowActionsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ShowActionsCommandSetStrings' {
  const strings: IShowActionsCommandSetStrings;
  export = strings;
}
