export class Environment {
  constructor(
    public readonly databasePath: string,
    public readonly listenPort: number,
  ) {}

  public static fromLocal(): Environment {
    const databasePath: string = process.env.DATABASE_PATH ?? "";
    const listenPort: number = Number(process.env.LISTEN_PORT ?? 8080);
    return new Environment(databasePath, listenPort);
  }
}
