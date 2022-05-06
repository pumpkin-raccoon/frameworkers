import { FormControl, InputLabel, MenuItem, Radio, Select } from "@mui/material"
import { Relationship } from "types/relationship"
import useRelationshipResult, { RelationshipResultMenu } from "./useRelationshipResult"
import styles from './RelationshipResult.module.scss'
import Script from "next/script"
import classNames from "classnames"
import { getPieChartTypeText, PieChartType } from "./functions"

interface RelationshipResultProps {
  relationship: Relationship
}

const RelationshipResult = ({
  relationship
}: RelationshipResultProps) => {
  const {
    menu,
    setMenu,
    pieChartType,
    setPieChartType,
  } = useRelationshipResult({ relationship })
  
  return (
    <div className={styles.container}>
      <Script src="https://d3js.org/d3.v6.js" />
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">분석 종류</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={menu}
            label="분석 종류"
            onChange={(event) => setMenu(event.target.value as RelationshipResultMenu)}
          >
            <MenuItem value={RelationshipResultMenu.Diagram}>
              <p className={styles.menuItem}>
                친구 분포
              </p>
            </MenuItem>
            <MenuItem value={RelationshipResultMenu.Pie}>
              <p className={styles.menuItem}>
                친구 비율
              </p>
            </MenuItem>
          </Select>
        </FormControl>  
      </div>

      {menu === RelationshipResultMenu.Pie && (
        <div className={styles.pieTypeWrapper}>
          {Object.values(PieChartType).map((type) => (
            <div
              className={styles.pieType}
              key={type}
              onClick={() => setPieChartType(type)}
            >
              <Radio
                checked={type === pieChartType}
                onChange={() => setPieChartType(type)}
                value={getPieChartTypeText(type)}
                size="small"
              />
              <p className={styles.typeText}>
                {getPieChartTypeText(type)}
              </p>
            </div>
          ))}
        </div>
      )}
      

      <div className={styles.pieChart}>
        <div 
          id="diagram" 
          className={classNames({[styles.disappear]: menu !== RelationshipResultMenu.Diagram})}
        />
        {Object.values(PieChartType).map((type) => (
          <div
            className={classNames({[styles.disappear]: type !== pieChartType || menu !== RelationshipResultMenu.Pie})}
            key={type} 
            id={type}
          />
        ))}
      </div>
    </div>
  )
}

export default RelationshipResult
