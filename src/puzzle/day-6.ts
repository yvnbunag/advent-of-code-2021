/* eslint-disable @typescript-eslint/naming-convention */
export class LanternFishSchool {
  static timeToReproduce = {
    NEWBORN: 8,
    ADULT: 6,
  }

  constructor(
    private _members = 1,
    private _timeToReproduce = LanternFishSchool.timeToReproduce.NEWBORN,
  ) {}

  get timeToReproduce(): number { return this._timeToReproduce }

  get members(): number { return this._members }

  cycle(): LanternFishSchool | null {
    const { _timeToReproduce } = this

    if (this._timeToReproduce === 0) return this.reproduce()

    this._timeToReproduce = _timeToReproduce - 1

    return null
  }

  private reproduce(): LanternFishSchool {
    this._timeToReproduce = LanternFishSchool.timeToReproduce.ADULT

    return new LanternFishSchool(this.members)
  }

  static extractTimeToReproduce(school: LanternFishSchool): number {
    return school.timeToReproduce
  }

  static extractMembers(school: LanternFishSchool): number {
    return school.members
  }
}

function add(first: number, second: number) {
  return first + second
}

export function observeLanternFishSchool(
  input: string,
  days: number,
): number {
  function observe(schools: Array<LanternFishSchool>, days: number): number {
    if (days < 1) {
      return schools
        .map(LanternFishSchool.extractMembers)
        .reduce(add, 0)
    }

    const newborns = schools
      .map((school) => school.cycle())
      .filter(Boolean) as Array<LanternFishSchool>
    const newbornCount = newborns
      .map(LanternFishSchool.extractMembers)
      .reduce(add, 0)
    const nextSchools = newbornCount
      ? [...schools, new LanternFishSchool(newbornCount)]
      : schools

    return observe(nextSchools, days - 1)
  }

  const schools = input.split(',')
    .map((timeToReproduce) => timeToReproduce.trim())
    .map(Number)
    .map((timeToReproduce) => new LanternFishSchool(1, timeToReproduce))

  return observe(schools, days)
}
