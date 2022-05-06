import { PieChartType } from "./useRelationshipResult";

export const getPieChartTypeText = (type: PieChartType) => {
  switch (type) {
    case PieChartType.Age:
      return '나이'
    case PieChartType.Intimacy:
      return '친밀도'
    case PieChartType.Gender:
      return '성별'
    case PieChartType.Category:
      return '카테고리'
  }
}
