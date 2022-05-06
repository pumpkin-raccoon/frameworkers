import { useEffect, useMemo, useState } from "react"
import { Gender, Relationship, RelationshipAge, RelationshipIntimacy, RelationshipPerson } from "types/relationship"
import { updatePieChart } from './pieChart'
import { initializeDiagram } from './vennDiagram'

export enum RelationshipResultMenu {
  Diagram = 'DIAGRAM',
  Pie = 'PIE'
}

export enum PieChartType {
  Age = 'AGE',
  Intimacy = 'INTIMACY',
  Gender = 'GENDER',
  Category = 'CATEGORY'
}

interface UseRelationshipResultProps {
  relationship: Relationship
}

const useRelationshipResult = ({
  relationship
}: UseRelationshipResultProps) => {
  const [chartInitialized, setChartInitialized] = useState(false)
  const [menu, setMenu] = useState<RelationshipResultMenu>(RelationshipResultMenu.Diagram)
  const [pieChartType, setPieChartType] = useState<PieChartType>(PieChartType.Gender)

  const peopleList = useMemo(() => {
    const listByType: {[key: string]: RelationshipPerson[]} = {
      [Gender.Male]: [],
      [Gender.Female]: [],
      [RelationshipIntimacy.High]: [],
      [RelationshipIntimacy.Middle]: [],
      [RelationshipIntimacy.Low]: [],
      [RelationshipAge.Higher]: [],
      [RelationshipAge.Same]: [],
      [RelationshipAge.Lower]: [],
    }
    const listByCategory: {[key: string]: RelationshipPerson[]} = {}
    relationship.people?.forEach((person) => {
      if (person.gender) {
        listByType[person.gender].push(person)
      }
      if (person.intimacy) {
        listByType[person.intimacy].push(person)
      }
      if (person.age) {
        listByType[person.age].push(person)
      }
      if (person.category && person.category.length > 0) {
        person.category.forEach((category) => {
          if (listByCategory[category]) {
            listByCategory[category].push(person)
          } else {
            listByCategory[category] = [person]
          }
        })
      }
    })
    return {
      type: listByType,
      category: listByCategory
    }
  }, [relationship])

  const getPieChartData = (type: PieChartType) => {
    switch (type) {
      case PieChartType.Age:
        return {
          [RelationshipAge.Higher]: peopleList.type[RelationshipAge.Higher].length,
          [RelationshipAge.Same]: peopleList.type[RelationshipAge.Same].length,
          [RelationshipAge.Lower]: peopleList.type[RelationshipAge.Lower].length,
        }
      case PieChartType.Intimacy:
        return {
          [RelationshipIntimacy.High]: peopleList.type[RelationshipIntimacy.High].length,
          [RelationshipIntimacy.Middle]: peopleList.type[RelationshipIntimacy.Middle].length,
          [RelationshipIntimacy.Low]: peopleList.type[RelationshipIntimacy.Low].length,
        }
      case PieChartType.Gender:
        return {
          [Gender.Male]: peopleList.type[Gender.Male].length,
          [Gender.Female]: peopleList.type[Gender.Female].length,
        }
      case PieChartType.Category:
        const categoryData: {[key: string]: number} = {}
        Object.keys(peopleList.category).forEach((category) => {
          categoryData[category] = peopleList.category[category].length
        })
        return categoryData
    }
  }

  const initializeCharts = () => {
    console.log('initialize chart')
    if (chartInitialized) {
      return
    }
    setChartInitialized(true)
    const initializePieChart = () => {
      Object.values(PieChartType).forEach((type) => {
        updatePieChart(type, getPieChartData(type))
      })
    }
    initializeDiagram()
    initializePieChart()
  }

  useEffect(() => {
    initializeCharts()
  }, [])

  return {
    menu,
    setMenu,
    pieChartType,
    setPieChartType,
  }
}

export default useRelationshipResult
