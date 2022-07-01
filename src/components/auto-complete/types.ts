import { InputProps } from "@/components/input/types";
import { ReactElement } from "react";



interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export type FetchForSuggestion = (arg0: string) => DataSourceType[] | Promise<DataSourceType[]>


// type Test = DataSourceObject & {}
// let test:Test = {value:'s'}
// const test:FetchForSuggestion = (str) => {
//   return [{
//     value:'xxx'
//   }]
// }

// const testSOurce:DataSourceType<{}> = {value:'xxx'}


export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: FetchForSuggestion;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}
