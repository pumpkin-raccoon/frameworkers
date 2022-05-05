export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export enum RelationshipIntimacy {
  Low = "LOW",
  Middle = 'MIDDLE',
  High = 'HIGH'
}

export enum RelationshipAge {
  Lower = 'LOWER',
  Same = 'SAME',
  Higher = 'HIGHER'
}

export interface Relationship {
  name?: string
  gender?: Gender
  age?: RelationshipAge
  intimacy?: RelationshipIntimacy
  category?: string[]
}
