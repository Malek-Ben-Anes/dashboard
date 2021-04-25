export class UpdateMarkRequest {
  mark: number;
  observation: string;

  constructor(mark: number, observation: string) {
    this.mark = mark;
    this.observation = observation;
  }
}
