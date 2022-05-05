import { Gender, RelationshipAge, RelationshipIntimacy } from "types/relationship";

export const getGenderText = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return '남'
    case Gender.Female:
      return '여'
  }
}

export const getAgeText = (age: RelationshipAge) => {
  switch (age) {
    case RelationshipAge.Higher:
      return '인생 선배'
    case RelationshipAge.Same:
      return '또래'
    case RelationshipAge.Lower:
      return '인생 후배'
  }
}

export const getIntimacyText = (intimacy: RelationshipIntimacy) => {
  switch (intimacy) {
    case RelationshipIntimacy.Low:
      return '친밀도: 하'
    case RelationshipIntimacy.Middle:
      return '친밀도: 중'
    case RelationshipIntimacy.High:
      return '친밀도: 상'
  }
}
